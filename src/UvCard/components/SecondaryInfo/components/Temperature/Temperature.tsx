import { type FC } from 'react';
import type { TemperatureData } from 'types';
import { Skeleton } from 'UvCard/components/Skeleton';

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

  const { current } = temperatureData || {};
  return <>{current}°</>;
};
