import { useQuery } from '@tanstack/react-query';
import { getTemperature } from '../temperature';
import { STALE_TIME } from '../../utils/constants';
import { INVALID_LAT_LONG } from '../../UvCard/utils/constants';

export const useTemperature = (latitude: number, longitude: number) => {
  const getTemperatureAsync = async () => {
    const result = await getTemperature(latitude, longitude);
    const { current, daily } = result.data || {};

    if (!result.data || !current || !daily) {
      throw new Error('Was not able to get temperature');
    }

    return {
      current: { temperature: current.temperature_2m },
      daily: { tempMax: daily.temperature_2m_max, tempMin: daily.temperature_2m_min }
    };
  };

  return useQuery({
    queryKey: ['temperature', latitude, longitude],
    queryFn: getTemperatureAsync,
    enabled: latitude !== INVALID_LAT_LONG && longitude !== INVALID_LAT_LONG,
    staleTime: STALE_TIME
  });
};
