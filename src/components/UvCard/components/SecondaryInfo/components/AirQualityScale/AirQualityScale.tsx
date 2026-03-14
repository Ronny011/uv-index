import { type FC } from 'react';
import { airQualityLevelMutedColors, LevelBlock, Scale } from './AirQualityScale.styles';
import { EASE, TRANSITION_TIME } from 'utils/constants';
import { Skeleton } from '../../../Skeleton';
import { Body } from 'components/UvCard/UvCard.styles';

interface Props {
  aqi: number;
  qualityLevel: number;
  isloading: boolean;
  error: Error | null;
}

export const AirQualityScale: FC<Props> = ({ aqi, qualityLevel, isloading, error }) => {
  if (isloading) {
    return (
      <>
        <Skeleton
          height={18}
          width={85}
        />
        <Skeleton
          height={24}
          width={245}
        />
      </>
    );
  }

  return (
    <>
      <Body>{error?.message || 'Air quality'}</Body>

      <Scale>
        {airQualityLevelMutedColors.map((color, index) => {
          const isActiveBlock = qualityLevel === index;
          return (
            <LevelBlock
              key={color}
              color={color}
              index={index}
              $isActiveBlock={isActiveBlock}
              animate={{
                scale: isActiveBlock ? 1.3 : 1,
                transition: { delay: TRANSITION_TIME, duration: TRANSITION_TIME, ease: EASE }
              }}
            >
              {qualityLevel === index && aqi}
            </LevelBlock>
          );
        })}
      </Scale>
    </>
  );
};
