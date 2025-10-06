import { Body, Chip, Flower, Indicator, SecondaryInfo, UvText } from './UvCard.styles';
import { useReverseGeocode } from '../api/queries/useReverseGeocode';
import { useUvIndex } from '../api/queries/useUvIndex';
import { useGetGeolocation } from './hooks/useGetGeolocation';
import { NOT_FOUND } from './utils/constants';
import { Skeleton } from '../Skeleton';
import { useAirQualityIndex } from '../api/queries/useAirQualityIndex';
import { useTemperature } from '../api/queries/useTemperature';

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

  const {
    data: temperatureData,
    isPending: isTemperaturePending,
    isError: isTemperatureError,
    error: temperatureError
  } = useTemperature(latitude, longitude);
  const { current, daily } = temperatureData || {};

  if (geolocationError) {
    return <Body>{geolocationError}</Body>;
  }

  if (isReverseGeolocationError && reverseGeolocationError) {
    return <Body>{reverseGeolocationError.message}</Body>;
  }

  if (isUvIndexError && uvIndexError) {
    return <Body>{uvIndexError.message}</Body>;
  }

  if (isTemperatureError && temperatureError) {
    return <Body>{temperatureError.message}</Body>;
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
          at {uvMaxTime}
        </Body>
      )}
      <SecondaryInfo>
        {isAirQualityIndexPending ? (
          <Skeleton
            height={24}
            width={58}
          />
        ) : (
          <Body>{AirQualityIndexError ? airQualityError.message : `AQI ${airQualityIndex?.aqi}`}</Body>
        )}
        {isTemperaturePending ? (
          <Skeleton
            height={24}
            width={157}
          />
        ) : (
          <>
            <Body>{'|'}</Body>
            <Body>{`Temperature: ${current?.temperature}`}°</Body>
          </>
        )}
      </SecondaryInfo>
    </>
  );
};
