import { type FC } from 'react';
import type { TemperatureData } from 'types';
import { Skeleton } from '../../../Skeleton';
import { LimitTemperature, MainTemperature, TemperaturesFlexWrapper } from './Temperature.styles';
import { Body } from 'components/UvCard/UvCard.styles';

interface Props {
  temperatureData: TemperatureData | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const Temperature: FC<Props> = ({ isLoading, temperatureData, error }) => {
  if (isLoading) {
    return (
      <>
        <Skeleton
          height={18}
          width={105}
        />
        <Skeleton
          height={24}
          width={157}
        />
      </>
    );
  }

  const { current, dailyMin, dailyMax } = temperatureData || {};
  return (
    <>
      <Body>{error?.message || 'Temperature'}</Body>

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
    </>
  );
};
