import type { UVI } from '../types';
import { AqiHealth } from './constants';

export const getDateFromISO = (isoDate: string) => isoDate.split('T')[0];
export const getTimeFromISO = (isoDate: string) => isoDate.split('T')[1].slice(0, -4);

export const getMaxUv = (uvi: number, unifiedDataForToday: UVI[]) => {
  return unifiedDataForToday.reduce((acc, curr) => {
    if (curr.uvi > acc) {
      acc = curr.uvi;
    }
    return acc;
  }, uvi);
};

export const getAqiHealth = (aqi: number) => {
  switch (true) {
    case aqi >= 0 && aqi <= 50:
      return AqiHealth.Good;

    case aqi >= 51 && aqi <= 100:
      return AqiHealth.Moderate;

    case aqi >= 101 && aqi <= 150:
      return AqiHealth.UnhealthyForSensitiveGroups;

    case aqi >= 151 && aqi <= 200:
      return AqiHealth.Unhealthy;

    case aqi >= 201 && aqi <= 300:
      return AqiHealth.VeryUnhealthy;

    case aqi >= 301 && aqi <= 500:
      return AqiHealth.Hazardous;

    default:
      return AqiHealth.OutOfScale;
  }
};
