import { type FC } from 'react';
import { airQualityLevelColors, LevelBlock, Scale } from './AirQualityScale.styles';
import { TRANSITION_TIME } from 'utils/constants';

interface Props {
  aqi: number;
  qualityLevel: number;
}

export const AirQualityScale: FC<Props> = ({ aqi, qualityLevel }) => {
  return (
    <Scale>
      {airQualityLevelColors.map((color, index) => {
        const isCorrespondingBlock = qualityLevel === index;
        return (
          <LevelBlock
            key={color}
            color={color}
            index={index}
            isCorrespondingBlock={isCorrespondingBlock}
            animate={{
              scale: isCorrespondingBlock ? 1.5 : 1,
              transition: { delay: TRANSITION_TIME, duration: TRANSITION_TIME, ease: 'easeInOut' }
            }}
          >
            {qualityLevel === index && aqi}
          </LevelBlock>
        );
      })}
    </Scale>
  );
};
