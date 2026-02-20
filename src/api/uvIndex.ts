import axios from 'axios';
import type { BackupUvIndexResponse, UvIndexResponse } from '../types';

const OPEN_UV_API_KEY = import.meta.env.VITE_OPEN_UV_API_KEY;
const OPEN_UV_API_BASE_URL = import.meta.env.VITE_OPEN_UV_API_BASE_URL;
const LESS_STRICT_UV_INDEX_API_BASE_URL = import.meta.env.VITE_LESS_STRICT_UV_INDEX_API_BASE_URL;

const headers = { 'x-access-token': OPEN_UV_API_KEY, 'Content-Type': 'application/json' };

export const getBackupUvIndex = (latitude: number, longitude: number) =>
  axios.get<BackupUvIndexResponse>(`${OPEN_UV_API_BASE_URL}?lat=${latitude}&lng=${longitude}`, { headers });

export const getUvIndex = (latitude: number, longitude: number) =>
  axios.get<UvIndexResponse>(`${LESS_STRICT_UV_INDEX_API_BASE_URL}?latitude=${latitude}&longitude=${longitude}`);
