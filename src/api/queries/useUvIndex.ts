import { useQuery } from '@tanstack/react-query';
import { getBackupUvIndex, getUvIndex } from '../uvIndex';
import { INVALID_LAT_LONG } from '../../UvCard/utils/UvCard.constants';
import { getMaxUv } from '../../utils/helpers';
import { STALE_TIME } from '../../utils/constants';

export const useUvIndex = (longitude: number, latitude: number) => {
  const getUvIndexAsync = async () => {
    const result = await getUvIndex(longitude, latitude);
    const { now, forecast, history } = result.data || {};

    if (!result.data || !now || !(now.uvi || Number.isInteger(now.uvi))) {
      throw new Error('Was not able to get UV index');
    }

    return { uv: now.uvi, uvMax: getMaxUv(now, [...forecast, ...history]) };
  };

  return useQuery({
    queryKey: ['uv-index', longitude, latitude],
    queryFn: getUvIndexAsync,
    enabled: latitude !== INVALID_LAT_LONG && longitude !== INVALID_LAT_LONG,
    staleTime: STALE_TIME
  });
};

export const useBackupUvIndex = (longitude: number, latitude: number) => {
  const getUvIndexAsync = async () => {
    const result = await getBackupUvIndex(longitude, latitude);

    if (!result.data || !result.data.result || !(result.data.result.uv || Number.isInteger(result.data.result.uv))) {
      throw new Error('Was not able to get UV index');
    }

    return { ...result.data.result, uvMax: result.data.result.uv_max };
  };

  return useQuery({
    queryKey: ['backup-uv-index', longitude, latitude],
    queryFn: getUvIndexAsync,
    enabled: latitude !== INVALID_LAT_LONG && longitude !== INVALID_LAT_LONG,
    staleTime: STALE_TIME
  });
};
