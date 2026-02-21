import { useQuery } from '@tanstack/react-query';
import { getTemperature } from '../temperature';
import { STALE_TIME } from '../../utils/constants';
import { INVALID_LAT_LONG } from 'components/UvCard/utils/constants';

export const useTemperature = (latitude: number, longitude: number) => {
  const getTemperatureAsync = async () => {
    const result = await getTemperature(latitude, longitude);
    const { current, daily } = result.data || {};

    if (!result.data || !current || !daily) {
      throw new Error('Was not able to get temperature');
    }

    return {
      current: current.temperature_2m,
      dailyMin: daily.temperature_2m_min,
      dailyMax: daily.temperature_2m_max
    };
  };

  return useQuery({
    queryKey: ['temperature', latitude, longitude],
    queryFn: getTemperatureAsync,
    enabled: latitude !== INVALID_LAT_LONG && longitude !== INVALID_LAT_LONG,
    staleTime: STALE_TIME
  });
};
