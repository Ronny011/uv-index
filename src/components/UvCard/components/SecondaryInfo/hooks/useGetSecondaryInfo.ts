import { useAirQualityIndex } from 'api/queries/useAirQualityIndex';
import { useTemperature } from 'api/queries/useTemperature';

export const useGetSecondaryInfo = (latitude: number, longitude: number) => {
  const {
    data: airQualityIndex,
    isError: isAirQualityIndexError,
    isPending: isAirQualityIndexPending,
    error: airQualityError
  } = useAirQualityIndex(latitude, longitude);

  const {
    data: temperatureData,
    isPending: isTemperaturePending,
    isError: isTemperatureError,
    error: temperatureError
  } = useTemperature(latitude, longitude);

  return {
    airQualityIndex,
    isAirQualityIndexPending,
    isAirQualityIndexError,
    airQualityError,
    temperatureData,
    isTemperaturePending,
    isTemperatureError,
    temperatureError
  };
};
