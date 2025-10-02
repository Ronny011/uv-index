const currentMinutes = new Date().getMinutes();

export const getWeightedAverageUvIndex = (thisHourIndex: number, nextHourIndex: number) =>
  (thisHourIndex * (60 - currentMinutes) + nextHourIndex * currentMinutes) / 60;
