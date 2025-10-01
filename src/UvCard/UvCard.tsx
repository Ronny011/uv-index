import { type FC, useState, useEffect } from 'react';
import { Flower, Text } from './UvCard.styles';

interface Props {}

export const UvCard: FC<Props> = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const success = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords || {};
      setLocation({
        latitude,
        longitude
      });

      setError(null);
    };

    const handleError = (error: GeolocationPositionError) => {
      setError(error.message);
      console.error('Geolocation error:', error);
    };

    navigator.geolocation.getCurrentPosition(success, handleError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }, []);

  return (
    <>
      UV index at {location.latitude}, {location.longitude}
      {error && <p>{error}</p>}
      <Flower>
        <Text>5</Text>
      </Flower>
    </>
  );
};
