import { Body, Flower, Indicator, UvText } from './UvCard.styles';
import { useReverseGeocode } from '../api/queries/useReverseGeocode';
import { useUvIndex } from '../api/queries/useUvIndex';
import { useGetGeolocation } from './hooks/useGetGeolocation';
import { NOT_FOUND } from './utils/constants';
import { Skeleton } from '../Skeleton';
import { getWeightedAverageUvIndex } from './utils/helpers';

const LOW_UV_CUTOFF = 4;

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
    data: uvIndexdata,
    isError: isUvIndexError,
    isPending: isUvIndexPeding,
    error: uvIndexError
  } = useUvIndex(latitude, longitude);
  const { uv, uvMax, nextHourUv } = uvIndexdata || {};

  const uvIndex = getWeightedAverageUvIndex(uv!, nextHourUv!);

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

      <Indicator>
        {isUvIndexPeding ? (
          <Skeleton
            height={200}
            width={200}
            isRound
          />
        ) : (
          <Flower
            $isLowUv={Number(uvIndex) < LOW_UV_CUTOFF}
            animate={{ rotate: 360 }}
          >
            <>
              {uvIndex || Number.isInteger(uvIndex) ? (
                <UvText>{Number(uvIndex?.toFixed(2))}</UvText>
              ) : (
                <p>{NOT_FOUND}</p>
              )}
            </>
          </Flower>
        )}
      </Indicator>

      {isUvIndexPeding ? (
        <Skeleton
          height={24}
          width={215}
        />
      ) : (
        <Body>Max UV today: {uvMax?.toFixed(2)}</Body>
      )}
    </>
  );
};
