import { Body, Flower, UvText } from './UvCard.styles';
import { useReverseGeocode } from '../api/queries/useReverseGeocode';
import { useUvIndex } from '../api/queries/useUvIndex';
import { useGetGeolocation } from './hooks/useGetGeolocation';
import { NOT_FOUND } from './utils/UvCard.constants';
import { Skeleton } from '../Skeleton';

export const UvCard = () => {
  const { latitude, longitude, geolocationError } = useGetGeolocation();

  const {
    data: reverseGeolocation,
    isError: isReverseGeolocationError,
    isPending: isReverseGeolocationPending,
    error: reverseGeolocationError
  } = useReverseGeocode(latitude, longitude);
  const { city, country } = reverseGeolocation || {};

  const {
    data: uvIndex,
    isError: isUvIndexError,
    isPending: isUvIndexPeding,
    error: uvIndexError
  } = useUvIndex(latitude, longitude);
  const { uv, uvMax } = uvIndex || {};

  if (geolocationError) {
    return <p>{geolocationError}</p>;
  }

  if (isReverseGeolocationError && reverseGeolocationError) {
    return <p>{reverseGeolocationError.message}</p>;
  }

  if (isUvIndexError && uvIndexError) {
    return <p>{uvIndexError.message}</p>;
  }

  return (
    <>
      {isReverseGeolocationPending ? (
        <Skeleton
          height={24}
          width={215}
        />
      ) : (
        <Body>
          UV index at {city}, ({country})
        </Body>
      )}

      <Flower>
        {isUvIndexPeding ? (
          <Skeleton
            height={104}
            width={104}
          />
        ) : (
          <>{uv || Number.isInteger(uv) ? <UvText>{Number(uv?.toFixed(2))}</UvText> : <p>{NOT_FOUND}</p>}</>
        )}
      </Flower>

      {isUvIndexError ? (
        <Skeleton
          height={24}
          width={215}
        />
      ) : (
        <Body>Max UV today: {uvMax}</Body>
      )}
    </>
  );
};
