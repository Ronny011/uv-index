import type { UVI } from 'types';
import { ISO_TIME_DELIMITER } from 'utils/constants';

export const getWeightedAverageUvIndex = (thisHourIndex: number, nextHourIndex: number) => {
  const currentMinutes = new Date().getMinutes();
  return (thisHourIndex * (60 - currentMinutes) + nextHourIndex * currentMinutes) / 60;
};

export const getDateFromISO = (isoDate: string) => isoDate.split(ISO_TIME_DELIMITER)[0];

export const getTimeFromISO = (isoDate: string) => {
  const timeOffset = new Date().getTimezoneOffset() / -60;
  const UtcTime = isoDate.split(ISO_TIME_DELIMITER)[1].slice(0, -4);
  const [hours, minutes] = UtcTime.split(':');

  return `${Number(hours) + timeOffset}:${minutes}`;
};

export const getMaxUv = (uvi: number, unifiedDataForToday: UVI[]) => {
  return unifiedDataForToday.reduce((acc, curr) => {
    if (curr.uvi > acc) {
      acc = curr.uvi;
    }
    return acc;
  }, uvi);
};
