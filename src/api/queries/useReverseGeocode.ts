import { useQuery } from '@tanstack/react-query';
import { getReverseGeolocation } from '../reverseGeolocation';
import { INVALID_LAT_LONG } from '../../UvCard/utils/constants';
import { STALE_TIME } from '../../utils/constants';

export const useReverseGeocode = (latitude: number, longitude: number) => {
  const getReverseGeolocationAsync = async () => {
    const result = await getReverseGeolocation(latitude, longitude);

    return result.data.address;
  };

  return useQuery({
    queryKey: ['reverse-geolocation', latitude, longitude],
    queryFn: getReverseGeolocationAsync,
    enabled: latitude !== INVALID_LAT_LONG && longitude !== INVALID_LAT_LONG,
    staleTime: STALE_TIME
  });
};
