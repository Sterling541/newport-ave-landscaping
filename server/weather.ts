/**
 * Open-Meteo weather integration for Bend, OR.
 * No API key required — completely free.
 * Docs: https://open-meteo.com/en/docs
 */

const BEND_LAT = 44.058;
const BEND_LON = -121.315;

export interface DailyWeatherRow {
  date: string;          // YYYY-MM-DD
  tempHighC: number;
  tempLowC: number;
  tempHighF: number;
  tempLowF: number;
  precipMm: number;
  snowMm: number;
  windAvgKph: number;
  cloudCoverPct: number;
  weatherCode: number;
  dataType: "historical" | "forecast";
}

function cToF(c: number): number {
  return Math.round(((c * 9) / 5 + 32) * 10) / 10;
}

/** Fetch historical weather for a date range from Open-Meteo archive API */
export async function fetchHistoricalWeather(startDate: string, endDate: string): Promise<DailyWeatherRow[]> {
  const params = new URLSearchParams({
    latitude: String(BEND_LAT),
    longitude: String(BEND_LON),
    start_date: startDate,
    end_date: endDate,
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "snowfall_sum",
      "windspeed_10m_max",
      "cloudcover_mean",
      "weathercode",
    ].join(","),
    timezone: "America/Los_Angeles",
    temperature_unit: "celsius",
    windspeed_unit: "kmh",
    precipitation_unit: "mm",
  });

  const url = `https://archive-api.open-meteo.com/v1/archive?${params}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Open-Meteo archive API error: ${resp.status} ${resp.statusText}`);
  const data = await resp.json();

  return parseOpenMeteoResponse(data, "historical");
}

/** Fetch 14-day weather forecast from Open-Meteo forecast API */
export async function fetchWeatherForecast(): Promise<DailyWeatherRow[]> {
  const params = new URLSearchParams({
    latitude: String(BEND_LAT),
    longitude: String(BEND_LON),
    forecast_days: "14",
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "snowfall_sum",
      "windspeed_10m_max",
      "cloudcover_mean",
      "weathercode",
    ].join(","),
    timezone: "America/Los_Angeles",
    temperature_unit: "celsius",
    windspeed_unit: "kmh",
    precipitation_unit: "mm",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Open-Meteo forecast API error: ${resp.status} ${resp.statusText}`);
  const data = await resp.json();

  return parseOpenMeteoResponse(data, "forecast");
}

function parseOpenMeteoResponse(data: Record<string, unknown>, dataType: "historical" | "forecast"): DailyWeatherRow[] {
  const daily = data.daily as Record<string, unknown[]>;
  if (!daily || !daily.time) return [];

  const dates = daily.time as string[];
  const maxTemps = (daily.temperature_2m_max as number[]) ?? [];
  const minTemps = (daily.temperature_2m_min as number[]) ?? [];
  const precip = (daily.precipitation_sum as number[]) ?? [];
  const snow = (daily.snowfall_sum as number[]) ?? [];
  const wind = (daily.windspeed_10m_max as number[]) ?? [];
  const cloud = (daily.cloudcover_mean as number[]) ?? [];
  const codes = (daily.weathercode as number[]) ?? [];

  return dates.map((date, i) => {
    const highC = maxTemps[i] ?? 0;
    const lowC = minTemps[i] ?? 0;
    return {
      date,
      tempHighC: Math.round(highC * 10) / 10,
      tempLowC: Math.round(lowC * 10) / 10,
      tempHighF: cToF(highC),
      tempLowF: cToF(lowC),
      precipMm: Math.round((precip[i] ?? 0) * 10) / 10,
      snowMm: Math.round((snow[i] ?? 0) * 10) / 10,
      windAvgKph: Math.round((wind[i] ?? 0) * 10) / 10,
      cloudCoverPct: Math.round(cloud[i] ?? 0),
      weatherCode: codes[i] ?? 0,
      dataType,
    };
  });
}

/** Human-readable description of WMO weather code */
export function describeWeatherCode(code: number): string {
  const map: Record<number, string> = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Icy fog",
    51: "Light drizzle", 53: "Moderate drizzle", 55: "Dense drizzle",
    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
    77: "Snow grains", 80: "Slight showers", 81: "Moderate showers", 82: "Violent showers",
    85: "Slight snow showers", 86: "Heavy snow showers",
    95: "Thunderstorm", 96: "Thunderstorm with hail", 99: "Thunderstorm with heavy hail",
  };
  return map[code] ?? `Weather code ${code}`;
}

/** Get weather emoji for a WMO code */
export function weatherEmoji(code: number): string {
  if (code === 0) return "☀️";
  if (code <= 2) return "🌤️";
  if (code === 3) return "☁️";
  if (code <= 48) return "🌫️";
  if (code <= 55) return "🌦️";
  if (code <= 65) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 86) return "🌨️";
  return "⛈️";
}
