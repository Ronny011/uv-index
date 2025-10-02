import { useQuery } from '@tanstack/react-query';
import { getReverseGeolocation } from '../reverseGeolocation';
import { INVALID_LAT_LONG } from '../../UvCard/utils/UvCard.constants';
import { STALE_TIME } from '../../utils/constants';

export const useReverseGeocode = (latitude: number, longtitude: number) => {
  const getReverseGeolocationAsync = async () => {
    const result = await getReverseGeolocation(latitude, longtitude);

    if (!result || !result.data || !result.data.address) {
      throw new Error('Not able to get revese geolocation');
    }

    return result.data.address;
  };

  return useQuery({
    queryKey: ['reverse-geolocation', latitude, longtitude],
    queryFn: getReverseGeolocationAsync,
    enabled: latitude !== INVALID_LAT_LONG && longtitude !== INVALID_LAT_LONG,
    staleTime: STALE_TIME
  });
};
