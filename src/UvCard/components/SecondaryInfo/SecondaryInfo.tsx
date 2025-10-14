import { type FC } from 'react';
import { Body } from '../../UvCard.styles';
import { Skeleton } from '../Skeleton';
import { FlexWrapper } from './SecondaryInfo.styles';
import { useGetSecondaryInfo } from './hooks/useGetSecondaryInfo';
import { AirQualityScale } from '../AirQualityScale';
import { getAqiHealth } from './util/helpers';

interface Props {
  latitude: number;
  longitude: number;
}

export const SecondaryInfo: FC<Props> = ({ latitude, longitude }) => {
  const {
    airQualityIndex,
    isAirQualityIndexPending,
    temperatureData,
    isTemperaturePending,
    isTemperatureError,
    temperatureError
  } = useGetSecondaryInfo(latitude, longitude);
  const { current, daily } = temperatureData || {};
  const aqi = airQualityIndex?.aqi || 0;

  return (
    <FlexWrapper>
      <Body>Air quality index</Body>
      {isAirQualityIndexPending ? (
        <Skeleton
          height={24}
          width={58}
        />
      ) : (
        // <Body>{isAirQualityIndexError ? airQualityError?.message : `AQI ${airQualityIndex?.aqi}`}</Body>
        <AirQualityScale
          aqi={aqi}
          qualityLevel={getAqiHealth(aqi).level}
        />
      )}
      {isTemperaturePending ? (
        <Skeleton
          height={24}
          width={157}
        />
      ) : (
        <Body>{isTemperatureError ? temperatureError?.message : `Temperature: ${current?.temperature}`}°</Body>
      )}
    </FlexWrapper>
  );
};
