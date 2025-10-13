export type UVI = { time: string; uvi: number };

export type ReveseGeolocationResponse = {
  address: { town?: string; city?: string; country: string };
};

export type BackupUvIndexResponse = { result: { uv: number; uv_max: number } };

export type UvIndexResponse = { now: UVI; forecast: UVI[]; history: UVI[] };

export type AirQualityAndReveseGeocodeResponse = { data: { aqi: number; city: { name: string } } };

export type TemperatureResponse = {
  current: { temperature_2m: number; is_day: number };
  daily: { temperature_2m_max: number[]; temperature_2m_min: number[] };
};
