/**
 * Geocoder — uses the Manus Maps proxy to geocode siteAddress fields
 * and extract neighborhood/city from reverse geocoding results.
 *
 * Batch geocodes all un-geocoded submissions in the DB.
 */

import { makeRequest } from "./_core/map";
import { getDb } from "./db";
import { serviceSubmissions } from "../drizzle/schema";
import { isNull, and, eq } from "drizzle-orm";

interface GeocodeResult {
  lat: number;
  lng: number;
  neighborhood: string | null;
  city: string | null;
}

/**
 * Geocode a single address string using the Manus Maps Geocoding API.
 * Returns null if geocoding fails or no results are found.
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  try {
    const response = await makeRequest<{
      status: string;
      results: Array<{
        geometry: { location: { lat: number; lng: number } };
        address_components: Array<{
          long_name: string;
          short_name: string;
          types: string[];
        }>;
      }>;
    }>(`/maps/api/geocode/json?address=${encodeURIComponent(address)}&region=us`);

    if (response.status !== "OK" || !response.results?.length) {
      return null;
    }

    const result = response.results[0];
    const { lat, lng } = result.geometry.location;

    // Extract neighborhood and city from address components
    let neighborhood: string | null = null;
    let city: string | null = null;

    for (const component of result.address_components) {
      if (component.types.includes("neighborhood") && !neighborhood) {
        neighborhood = component.long_name;
      }
      if (component.types.includes("sublocality_level_1") && !neighborhood) {
        neighborhood = component.long_name;
      }
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_3") && !city) {
        city = component.long_name;
      }
    }

    // For Bend area, if no neighborhood found, use city as fallback area label
    if (!neighborhood && city) {
      neighborhood = city;
    }

    return { lat, lng, neighborhood, city };
  } catch (err) {
    console.error("[geocoder] Failed to geocode address:", address, err);
    return null;
  }
}

/**
 * Batch geocode all submissions that have a siteAddress but no lat/lng yet.
 * Respects a rate limit of ~10 req/sec to avoid API throttling.
 * Returns counts of geocoded and failed rows.
 */
export async function batchGeocodeSubmissions(limit = 100): Promise<{ geocoded: number; failed: number; skipped: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Find rows that haven't been geocoded yet
  const rows = await db
    .select({
      id: serviceSubmissions.id,
      siteAddress: serviceSubmissions.siteAddress,
    })
    .from(serviceSubmissions)
    .where(and(isNull(serviceSubmissions.lat), isNull(serviceSubmissions.geocodedAt)))
    .limit(limit);

  let geocoded = 0;
  let failed = 0;
  let skipped = 0;

  for (const row of rows) {
    const address = row.siteAddress?.trim();
    if (!address || address.length < 5) {
      skipped++;
      // Mark as attempted so we don't retry blank addresses
      await db
        .update(serviceSubmissions)
        .set({ geocodedAt: new Date() })
        .where(eq(serviceSubmissions.id, row.id));
      continue;
    }

    // Append Bend, OR if no state/city hint present
    const fullAddress = /bend|or\b|oregon/i.test(address)
      ? address
      : `${address}, Bend, OR`;

    const result = await geocodeAddress(fullAddress);

    await db
      .update(serviceSubmissions)
      .set({
        lat: result ? String(result.lat) : null,
        lng: result ? String(result.lng) : null,
        neighborhood: result?.neighborhood ?? null,
        city: result?.city ?? null,
        geocodedAt: new Date(),
      })
      .where(eq(serviceSubmissions.id, row.id));

    if (result) {
      geocoded++;
    } else {
      failed++;
    }

    // Small delay to respect rate limits (~10 req/sec)
    await new Promise(res => setTimeout(res, 110));
  }

  return { geocoded, failed, skipped };
}
