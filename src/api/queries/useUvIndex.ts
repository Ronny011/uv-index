import { useQuery } from '@tanstack/react-query';
import { getBackupUvIndex, getUvIndex } from '../uvIndex';
import { INVALID_LAT_LONG } from '../../UvCard/utils/constants';
import { ISO_TIME_DELIMITER, STALE_TIME } from '../../utils/constants';
import { getDateFromISO, getMaxUv, getTimeFromISO, getWeightedAverageUvIndex } from '../../UvCard/utils/helpers';

export const useUvIndex = (longitude: number, latitude: number) => {
  const getUvIndexAsync = async () => {
    const result = await getUvIndex(longitude, latitude);
    const { now, forecast, history } = result.data || {};

    if (!result.data || !now || !(now.uvi || Number.isInteger(now.uvi))) {
      throw new Error('Was not able to get UV index');
    }

    const unifiedDataForToday = [...forecast, ...history].filter(
      ({ time }) => getDateFromISO(time) === getDateFromISO(now.time)
    );
    const maxUv = getMaxUv(now.uvi, unifiedDataForToday);
    const { time } = unifiedDataForToday.find((reading) => reading.uvi === maxUv) || {};

    return {
      uv: getWeightedAverageUvIndex(now.uvi, forecast[0].uvi),
      maxUv,
      maxUvTime: getTimeFromISO(time || ISO_TIME_DELIMITER)
    };
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
