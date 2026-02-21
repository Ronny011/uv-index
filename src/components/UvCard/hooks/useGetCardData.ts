import { useReverseGeocode } from 'queries/useReverseGeocode';
import { useGetGeolocation } from './useGetGeolocation';
import { useUvIndex } from 'queries/useUvIndex';

export const useGetCardData = () => {
  const { latitude, longitude, geolocationError } = useGetGeolocation();

  const {
    data: reverseGeolocation,
    isError: isReverseGeolocationError,
    isPending: isReverseGeolocationPending,
    error: reverseGeolocationError
  } = useReverseGeocode(latitude, longitude);

  const {
    data: uvIndexdata,
    isError: isUvIndexError,
    isPending: isUvIndexPeding,
    error: uvIndexError
  } = useUvIndex(latitude, longitude);

  return {
    geolocationError,
    reverseGeolocation,
    isReverseGeolocationPending,
    isReverseGeolocationError,
    reverseGeolocationError,
    uvIndexdata,
    isUvIndexPeding,
    isUvIndexError,
    uvIndexError,
    longitude,
    latitude
  };
};
