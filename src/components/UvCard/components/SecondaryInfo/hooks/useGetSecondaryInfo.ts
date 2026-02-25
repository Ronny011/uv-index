import { useAirQualityIndex } from 'api/queries/useAirQualityIndex';
import { useTemperature } from 'api/queries/useTemperature';

export const useGetSecondaryInfo = (latitude: number, longitude: number) => {
  const {
    data: airQualityIndex,
    isPending: isAirQualityIndexPending,
    error: airQualityError
  } = useAirQualityIndex(latitude, longitude);

  const {
    data: temperatureData,
    isPending: isTemperaturePending,
    error: temperatureError
  } = useTemperature(latitude, longitude);

  return {
    airQualityIndex,
    isAirQualityIndexPending,
    airQualityError,
    temperatureData,
    isTemperaturePending,
    temperatureError
  };
};
