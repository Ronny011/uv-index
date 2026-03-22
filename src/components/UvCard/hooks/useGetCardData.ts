import { useReverseGeocode } from 'queries/useReverseGeocode';
import { useGetGeolocation } from './useGetGeolocation';
import { useUvIndex } from 'queries/useUvIndex';
import { usePersistSeletedSettlement } from 'store/usePersistSeletedSettlement';
import { SettlementLocalStorage } from 'store/usePersistSettlements';

const getSelectedLocation = (settlement: SettlementLocalStorage | undefined) => {
  const location = settlement;

  if (location) {
    const { lat, lon } = location;
    return {
      latitude: lat,
      longitude: lon,
      geolocationError: ''
    };
  }

  return null;
};

export const useGetCardData = () => {
  const deviceLocation = useGetGeolocation();
  const selectedSettlement = usePersistSeletedSettlement((state) => state.selectedSettlement);

  const selectedLocation = getSelectedLocation(selectedSettlement) || deviceLocation;
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
