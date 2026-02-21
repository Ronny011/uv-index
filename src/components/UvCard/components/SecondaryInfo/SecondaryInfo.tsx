import { type FC } from 'react';
import { Body } from '../../UvCard.styles';
import { FlexWrapper } from './SecondaryInfo.styles';
import { useGetSecondaryInfo } from './hooks/useGetSecondaryInfo';
import { AirQualityScale } from './components/AirQualityScale';
import { getAqiHealth } from './util/helpers';
import { Temperature } from './components/Temperature';

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
  const aqi = airQualityIndex?.aqi || 0;

  return (
    <FlexWrapper>
      <Body>{isAirQualityIndexError ? airQualityError?.message : 'Air quality'}</Body>
      <AirQualityScale
        aqi={aqi}
        qualityLevel={getAqiHealth(aqi).level}
        isloading={isAirQualityIndexPending}
      />

      <Body>{isTemperatureError ? temperatureError?.message : `Temperature`}</Body>
      <Temperature
        temperatureData={temperatureData}
        isLoading={isTemperaturePending}
      />
    </FlexWrapper>
  );
};
