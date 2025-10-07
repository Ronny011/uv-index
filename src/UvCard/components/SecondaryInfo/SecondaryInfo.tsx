import { type FC } from 'react';
import { Body } from '../../UvCard.styles';
import { Skeleton } from '../Skeleton';
import { FlexWrapper } from './SecondaryInfo.styles';
import { useGetSecondaryInfo } from './hooks/useGetSecondaryInfo';

interface Props {
  latitude: number;
  longitude: number;
}

export const SecondaryInfo: FC<Props> = ({ latitude, longitude }) => {
  const {
    airQualityIndex,
    isAirQualityIndexPending,
    isAirQualityIndexError,
    airQualityError,
    temperatureData,
    isTemperaturePending,
    isTemperatureError,
    temperatureError
  } = useGetSecondaryInfo(latitude, longitude);
  const { current, daily } = temperatureData || {};

  return (
    <FlexWrapper>
      {isAirQualityIndexPending ? (
        <Skeleton
          height={24}
          width={58}
        />
      ) : (
        <Body>{isAirQualityIndexError ? airQualityError?.message : `AQI ${airQualityIndex?.aqi}`}</Body>
      )}
      {isTemperaturePending ? (
        <Skeleton
          height={24}
          width={157}
        />
      ) : (
        <>
          <Body>{'|'}</Body>
          <Body>{isTemperatureError ? temperatureError?.message : `Temperature: ${current?.temperature}`}°</Body>
        </>
      )}
    </FlexWrapper>
  );
};
