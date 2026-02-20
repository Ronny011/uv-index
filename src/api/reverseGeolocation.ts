import axios from 'axios';
import type { ReveseGeolocationResponse } from '../types';

const REVERSE_GEOCODING_API_BASE_URL = import.meta.env.VITE_REVERSE_GEOCODING_API_BASE_URL;
const REVERSE_GEOCODING_API_ACCESS_TOKEN = import.meta.env.VITE_REVERSE_GEOCODING_ACCESS_TOKEN;

export const getReverseGeolocation = (latitude: number, longtitude: number) =>
  axios.get<ReveseGeolocationResponse>(
    `${REVERSE_GEOCODING_API_BASE_URL}?key=${REVERSE_GEOCODING_API_ACCESS_TOKEN}&lat=${latitude}&lon=${longtitude}&format=json`
  );
