import axios, { AxiosResponse } from 'axios';
import type { TemperatureResponse } from '../types';

const TEMPERATURE_API_BASE_URL = import.meta.env.VITE_TEMPERATURE_API_BASE_URL;

const FORECAST_ADDITIONAL_URL_PARAMS =
  'daily=temperature_2m_max,temperature_2m_min&current=temperature_2m,is_day,weather_code&forecast_days=1';

export const getTemperature = (latitude: number, longitude: number): Promise<AxiosResponse<TemperatureResponse>> =>
  axios(`${TEMPERATURE_API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&${FORECAST_ADDITIONAL_URL_PARAMS}`);
