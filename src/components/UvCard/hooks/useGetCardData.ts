import { useReverseGeocode } from 'queries/useReverseGeocode';
import { useGetGeolocation } from './useGetGeolocation';
import { useUvIndex } from 'queries/useUvIndex';

export const useGetCardData = () => {
  const { latitude, longitude, geolocationError } = useGetGeolocation();

  const {
    data: reverseGeolocation,
    isPending: isReverseGeolocationPending,
    error: reverseGeolocationError
  } = useReverseGeocode(latitude, longitude);

  const { data: uvIndexdata, isPending: isUvIndexPeding, error: uvIndexError } = useUvIndex(latitude, longitude);

  return {
    geolocationError,
    reverseGeolocation,
    isReverseGeolocationPending,
    reverseGeolocationError,
    uvIndexdata,
    isUvIndexPeding,
    uvIndexError,
    longitude,
    latitude
  };
};
