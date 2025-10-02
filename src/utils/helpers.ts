import { UVI } from '../types';

const getDateFromISO = (isoDate: string) => isoDate.split('T')[0];

export const getMaxUv = (currentDate: string, forecastAndHistory: UVI[]) =>
  forecastAndHistory
    .filter(({ time }) => getDateFromISO(time) === getDateFromISO(currentDate))
    .reduce((acc, curr) => {
      if (curr.uvi > acc) {
        acc = curr.uvi;
      }
      return acc;
    }, 0);
