import { useReverseGeocode } from 'queries/useReverseGeocode';
import { useGetGeolocation } from './useGetGeolocation';
import { useUvIndex } from 'queries/useUvIndex';

export const SELECTED_LOCATION_KEY = 'selected-location';

const getSelectedLocation = () => {
  const location = localStorage.getItem(SELECTED_LOCATION_KEY);

  if (location) {
    const parsedLocation = JSON.parse(location);
    parsedLocation.geolocationError = '';
    return {
      latitude: parsedLocation.lat,
      longitude: parsedLocation.lon,
      geolocationError: ''
    };
  }

  return null;
};

export const useGetCardData = () => {
  const deviceLocation = useGetGeolocation();

  const selectedLocation = getSelectedLocation() || deviceLocation;
  const { latitude, longitude, geolocationError } = selectedLocation;

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
