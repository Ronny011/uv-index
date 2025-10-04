import { Body, Chip, Flower, Indicator, UvText } from './UvCard.styles';
import { useReverseGeocode } from '../api/queries/useReverseGeocode';
import { useUvIndex } from '../api/queries/useUvIndex';
import { useGetGeolocation } from './hooks/useGetGeolocation';
import { NOT_FOUND } from './utils/constants';
import { Skeleton } from '../Skeleton';
import { getTimeFromISO } from '../utils/helpers';
import { useAirQualityIndex } from '../api/queries/useAirQualityIndex';

const LOW_UV_CUTOFF = 4;

export const UvCard = () => {
  const { latitude, longitude, geolocationError } = useGetGeolocation();

  const {
    data: airQualityIndex,
    isError: AirQualityIndexError,
    isPending: isAirQualityIndexPending,
    error: airQualityError
  } = useAirQualityIndex(latitude, longitude);

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
  const { uv, uvMax, uvMaxTime } = uvIndexdata || {};

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
          UV index at {city}, {country}
        </Body>
      )}

      <Indicator $isLoading={isUvIndexPeding}>
        {isUvIndexPeding ? (
          <Skeleton
            height={200}
            width={200}
            isRound
          />
        ) : (
          <Flower
            $isLowUv={Number(uv) < LOW_UV_CUTOFF}
            animate={{ rotate: 360, transition: { delay: 0.3, duration: 0.3, ease: 'easeInOut' } }}
          >
            <>{uv || Number.isInteger(uv) ? <UvText>{Number(uv?.toFixed(2))}</UvText> : <p>{NOT_FOUND}</p>}</>
          </Flower>
        )}
      </Indicator>

      {isUvIndexPeding ? (
        <Skeleton
          height={34}
          width={215}
        />
      ) : (
        <Body>
          Max UV today: <Chip $isLowUv={Number(uvMax) < LOW_UV_CUTOFF}>{uvMax?.toFixed(2)}</Chip>
          at {getTimeFromISO(uvMaxTime || '')}
        </Body>
      )}
      {isAirQualityIndexPending ? (
        <Skeleton
          height={39}
          width={58}
        />
      ) : (
        <Body $topMargin={15}>{AirQualityIndexError ? airQualityError.message : `AQI ${airQualityIndex?.aqi}`}</Body>
      )}
    </>
  );
};
