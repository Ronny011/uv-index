type Address = { city: string; country: string };

export type ReveseGeolocationResponse = {
  address: Address;
};

export type UvIndexResponse = { result: { uv: number; uv_max: number } };
