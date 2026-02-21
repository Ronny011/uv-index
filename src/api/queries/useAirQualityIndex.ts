import { useQuery } from '@tanstack/react-query';
import { airQualityIndex } from '../airQualityIndex';
import { STALE_TIME } from '../../utils/constants';
import { INVALID_LAT_LONG } from 'components/UvCard/utils/constants';

export const useAirQualityIndex = (latitude: number, longitude: number) => {
  const airQualityIndexAsync = async () => {
    const result = await airQualityIndex(latitude, longitude);
    const {
      data: {
        aqi,
        city: { name }
      }
    } = result.data || {};

    if (!result.data || !result.data.data || !aqi) {
      throw new Error('Was not able to get AQI data');
    }

    return { ...result.data, aqi, city: name };
  };

  return useQuery({
    queryKey: ['air-quality', latitude, longitude],
    queryFn: airQualityIndexAsync,
    enabled: latitude !== INVALID_LAT_LONG && longitude !== INVALID_LAT_LONG,
    staleTime: STALE_TIME
  });
};
