import { UVI } from '../types';

const getDateFromISO = (isoDate: string) => isoDate.split('T')[0];

export const getMaxUv = (currentData: UVI, forecastAndHistory: UVI[]) => {
  const { uvi, time: currentDate } = currentData;
  return forecastAndHistory
    .filter(({ time }) => getDateFromISO(time) === getDateFromISO(currentDate))
    .reduce((acc, curr) => {
      if (curr.uvi > acc) {
        acc = curr.uvi;
      }
      return acc;
    }, uvi);
};
