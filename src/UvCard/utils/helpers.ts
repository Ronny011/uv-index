export const getWeightedAverageUvIndex = (thisHourIndex: number, nextHourIndex: number) => {
  const currentMinutes = new Date().getMinutes();
  return (thisHourIndex * (60 - currentMinutes) + nextHourIndex * currentMinutes) / 60;
};
