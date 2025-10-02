import { useQuery } from '@tanstack/react-query';
import { getUvIndex } from '../uvIndex';
import { INVALID_LAT_LONG } from '../../UvCard/utils/UvCard.constants';

export const useUvIndex = (longtitude: number, latitude: number) => {
  const getUvIndexAsync = async () => {
    const result = await getUvIndex(longtitude, latitude);

    if (!result.data || !result.data.result || !(result.data.result.uv || Number.isInteger(result.data.result.uv))) {
      throw new Error('Was not able to get UV index');
    }

    return { ...result.data.result, uvMax: result.data.result.uv_max };
  };

  return useQuery({
    queryKey: ['uv-index', longtitude, latitude],
    queryFn: getUvIndexAsync,
    enabled: latitude !== INVALID_LAT_LONG && longtitude !== INVALID_LAT_LONG
  });
};
