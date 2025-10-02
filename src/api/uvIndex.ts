import axios, { type AxiosResponse } from 'axios';
import type { UvIndexResponse } from '../types';

const OPEN_UV_API_KEY = import.meta.env.VITE_OPEN_UV_API_KEY;
const OPEN_UV_API_BASE_URL = import.meta.env.VITE_OPEN_UV_API_BASE_URL;

const headers = { 'x-access-token': OPEN_UV_API_KEY, 'Content-Type': 'application/json' };

export const getUvIndex = (latitude: number, longtitude: number): Promise<AxiosResponse<UvIndexResponse>> =>
  axios(`${OPEN_UV_API_BASE_URL}?lat=${latitude}&lng=${longtitude}`, { headers });
