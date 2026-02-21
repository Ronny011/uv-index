import { type FC } from 'react';
import type { TemperatureData } from 'types';
import { Skeleton } from '../../../Skeleton';
import { LimitTemperature, MainTemperature, TemperaturesFlexWrapper } from './Temperature.styles';

interface Props {
  temperatureData: TemperatureData | undefined;
  isLoading: boolean;
}

export const Temperature: FC<Props> = ({ isLoading, temperatureData }) => {
  if (isLoading) {
    return (
      <Skeleton
        height={24}
        width={157}
      />
    );
  }

  const { current, dailyMin, dailyMax } = temperatureData || {};
  return (
    <TemperaturesFlexWrapper>
      <LimitTemperature>
        <span>min</span>
        <span>{dailyMin}°</span>
      </LimitTemperature>
      <MainTemperature>{current}°</MainTemperature>
      <LimitTemperature>
        <span>max</span>
        <span>{dailyMax}°</span>
      </LimitTemperature>
    </TemperaturesFlexWrapper>
  );
};
