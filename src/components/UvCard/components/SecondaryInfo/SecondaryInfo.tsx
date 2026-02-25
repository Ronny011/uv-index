import { type FC } from 'react';
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
    airQualityError,
    temperatureData,
    isTemperaturePending,
    temperatureError
  } = useGetSecondaryInfo(latitude, longitude);
  const aqi = airQualityIndex?.aqi || 0;

  return (
    <FlexWrapper>
      <AirQualityScale
        aqi={aqi}
        qualityLevel={getAqiHealth(aqi).level}
        isloading={isAirQualityIndexPending}
        error={airQualityError}
      />

      <Temperature
        temperatureData={temperatureData}
        isLoading={isTemperaturePending}
        error={temperatureError}
      />
    </FlexWrapper>
  );
};
