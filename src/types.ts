type Address = { city: string; country: string };
export type UVI = { time: string; uvi: number };

export type ReveseGeolocationResponse = {
  address: Address;
};

export type BackupUvIndexResponse = { result: { uv: number; uv_max: number } };

export type UvIndexResponse = { now: UVI; forecast: UVI[]; history: UVI[] };
