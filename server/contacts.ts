/**
 * contacts.ts — DB helpers for Contacts, Properties, Contact-Property Links, and Property Files.
 */
import { getDb } from "./db";
import {
  contacts, properties, contactPropertyLinks, propertyFiles, appointments,
  type InsertContact,
  type InsertProperty,
  type InsertContactPropertyLink,
  type InsertPropertyFile,
} from "../drizzle/schema";
import { eq, like, or, desc, and, sql } from "drizzle-orm";

// ─────────────────────────────────────────────────────────────────────────────
// CONTACTS
// ─────────────────────────────────────────────────────────────────────────────

export async function listContacts(opts?: {
  search?: string;
  contactType?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return { rows: [], total: 0 };
  const { search, contactType, limit = 50, offset = 0 } = opts ?? {};
  const conditions = [];
  if (contactType) conditions.push(eq(contacts.contactType, contactType as any));
  if (search) {
    conditions.push(
      or(
        like(contacts.firstName, `%${search}%`),
        like(contacts.lastName, `%${search}%`),
        like(contacts.companyName, `%${search}%`),
        like(contacts.email, `%${search}%`),
        like(contacts.phone, `%${search}%`),
      )
    );
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const rows = await db
    .select()
    .from(contacts)
    .where(where)
    .orderBy(desc(contacts.createdAt))
    .limit(limit)
    .offset(offset);
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(contacts)
    .where(where);
  return { rows, total: Number(count) };
}

export async function getContactById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const [row] = await db.select().from(contacts).where(eq(contacts.id, id));
  return row ?? null;
}

export async function createContact(data: InsertContact) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [result] = await db.insert(contacts).values(data);
  return (result as any).insertId as number;
}

export async function updateContact(id: number, data: Partial<InsertContact>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(contacts).set(data).where(eq(contacts.id, id));
}

export async function deleteContact(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(contacts).where(eq(contacts.id, id));
}

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTIES
// ─────────────────────────────────────────────────────────────────────────────

export async function listProperties(opts?: {
  search?: string;
  propertyType?: string;
  limit?: number;
  offset?: number;
}) {
  const db = await getDb();
  if (!db) return { rows: [], total: 0 };
  const { search, propertyType, limit = 50, offset = 0 } = opts ?? {};
  const conditions = [];
  if (propertyType) conditions.push(eq(properties.propertyType, propertyType as any));
  if (search) {
    conditions.push(
      or(
        like(properties.propertyName, `%${search}%`),
        like(properties.address, `%${search}%`),
        like(properties.city, `%${search}%`),
        like(properties.zip, `%${search}%`),
      )
    );
  }
  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const rows = await db
    .select()
    .from(properties)
    .where(where)
    .orderBy(desc(properties.createdAt))
    .limit(limit)
    .offset(offset);
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(properties)
    .where(where);
  return { rows, total: Number(count) };
}

export async function getPropertyById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const [row] = await db.select().from(properties).where(eq(properties.id, id));
  return row ?? null;
}

export async function createProperty(data: InsertProperty) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [result] = await db.insert(properties).values(data);
  return (result as any).insertId as number;
}

export async function updateProperty(id: number, data: Partial<InsertProperty>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(properties).set(data).where(eq(properties.id, id));
}

export async function deleteProperty(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(properties).where(eq(properties.id, id));
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT ↔ PROPERTY LINKS
// ─────────────────────────────────────────────────────────────────────────────

export async function getLinksForContact(contactId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(contactPropertyLinks)
    .where(eq(contactPropertyLinks.contactId, contactId));
}

export async function getLinksForProperty(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(contactPropertyLinks)
    .where(eq(contactPropertyLinks.propertyId, propertyId));
}

export async function createLink(data: InsertContactPropertyLink) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [result] = await db.insert(contactPropertyLinks).values(data);
  return (result as any).insertId as number;
}

export async function updateLink(id: number, data: Partial<InsertContactPropertyLink>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(contactPropertyLinks).set(data).where(eq(contactPropertyLinks.id, id));
}

export async function deleteLink(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.delete(contactPropertyLinks).where(eq(contactPropertyLinks.id, id));
}

// ─────────────────────────────────────────────────────────────────────────────
// PROPERTY FILES
// ─────────────────────────────────────────────────────────────────────────────

export async function getFilesForProperty(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(propertyFiles)
    .where(eq(propertyFiles.propertyId, propertyId))
    .orderBy(desc(propertyFiles.createdAt));
}

export async function createPropertyFile(data: InsertPropertyFile) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [result] = await db.insert(propertyFiles).values(data);
  return (result as any).insertId as number;
}

export async function deletePropertyFile(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const [row] = await db.select().from(propertyFiles).where(eq(propertyFiles.id, id));
  await db.delete(propertyFiles).where(eq(propertyFiles.id, id));
  return row ?? null;
}

export async function updatePropertyFile(id: number, data: Partial<InsertPropertyFile>) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(propertyFiles).set(data).where(eq(propertyFiles.id, id));
}

// ─────────────────────────────────────────────────────────────────────────────
// APPOINTMENT HISTORY (linked via contactId / propertyId on appointments table)
// ─────────────────────────────────────────────────────────────────────────────

export async function getAppointmentsByContact(contactId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(appointments)
    .where(eq(appointments.contactId, contactId))
    .orderBy(desc(appointments.appointmentDate));
}

export async function getAppointmentsByProperty(propertyId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(appointments)
    .where(eq(appointments.propertyId, propertyId))
    .orderBy(desc(appointments.appointmentDate));
}
