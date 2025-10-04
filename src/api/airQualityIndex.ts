import axios, { AxiosResponse } from 'axios';
import type { AirQualityAndReveseGeocodeResponse } from '../types';

const AIR_QUALITY_INDEX_API_TOKEN = import.meta.env.VITE_AIR_QUALITY_INDEX_API_TOKEN;
const AIR_QUALITY_IDEX_API_BASE_URL = import.meta.env.VITE_AIR_QUALITY_IDEX_API_BASE_URL;

// also returns reverse geocode - city and country, but format is very inconsistent
export const airQualityIndex = (
  latitude: number,
  longitude: number
): Promise<AxiosResponse<AirQualityAndReveseGeocodeResponse>> =>
  axios(`${AIR_QUALITY_IDEX_API_BASE_URL}${latitude};${longitude}/?token=${AIR_QUALITY_INDEX_API_TOKEN}`);
