import axios, { AxiosResponse } from 'axios';
import type { TemperatureResponse } from '../types';

const TEMPERATURE_API_BASE_URL = import.meta.env.VITE_TEMPERATURE_API_BASE_URL;

export const getTemperature = (latitude: number, longitude: number): Promise<AxiosResponse<TemperatureResponse>> =>
  axios(
    `${TEMPERATURE_API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current=temperature_2m,is_day&forecast_days=1`
  );
