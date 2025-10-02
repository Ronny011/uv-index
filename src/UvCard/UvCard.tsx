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
    return <Body>{geolocationError}</Body>;
  }

  if (isReverseGeolocationError && reverseGeolocationError) {
    return <Body>{reverseGeolocationError.message}</Body>;
  }

  if (isUvIndexError && uvIndexError) {
    return <Body>{uvIndexError.message}</Body>;
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
            isRound
          />
        ) : (
          <>{uv || Number.isInteger(uv) ? <UvText>{Number(uv?.toFixed(2))}</UvText> : <p>{NOT_FOUND}</p>}</>
        )}
      </Flower>

      {isUvIndexPeding ? (
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
