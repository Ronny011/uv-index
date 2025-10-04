import { useQuery } from '@tanstack/react-query';
import { airQualityIndex } from '../airQualityIndex';
import { STALE_TIME } from '../../utils/constants';

export const useAirQualityIndex = (latitude: number, longitude: number) => {
  const airQualityIndexAsync = async () => {
    const result = await airQualityIndex(latitude, longitude);
    const {
      data: {
        data: {
          aqi,
          city: { name }
        }
      }
    } = result;

    if (!result.data || !result.data.data || !aqi) {
      throw new Error('Was not able to get AQI data');
    }

    return { aqi, city: name };
  };

  return useQuery({
    queryKey: ['air-quality', 'reverse-geolocation'],
    queryFn: airQualityIndexAsync,
    staleTime: STALE_TIME
  });
};
