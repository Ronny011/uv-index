export type UVI = { time: string; uvi: number };

export type ReveseGeolocationResponse = {
  address: { city: string; country: string };
};

export type BackupUvIndexResponse = { result: { uv: number; uv_max: number } };

export type UvIndexResponse = { now: UVI; forecast: UVI[]; history: UVI[] };

export type AirQualityAndReveseGeocodeResponse = { data: { aqi: number; city: { name: string } } };
