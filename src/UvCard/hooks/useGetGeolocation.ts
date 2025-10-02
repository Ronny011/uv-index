import { useEffect, useState } from 'react';

export const useGetGeolocation = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  });
  const [geolocationError, setGeolocationError] = useState<string | null>(null);

  const { latitude, longitude } = location;

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeolocationError('Geolocation is not supported by your browser');
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords || {};
      setLocation({
        latitude,
        longitude
      });

      setGeolocationError(null);
    };

    const handleGeolocationError = (error: GeolocationPositionError) => {
      setGeolocationError(error.message);
      console.error('Geolocation error:', error);
    };

    navigator.geolocation.getCurrentPosition(success, handleGeolocationError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }, []);

  return { latitude, longitude, geolocationError };
};
