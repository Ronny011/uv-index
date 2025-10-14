import { type FC } from 'react';
import { airQualityLevelMutedColors, LevelBlock, Scale } from './AirQualityScale.styles';
import { EASE, TRANSITION_TIME } from 'utils/constants';

interface Props {
  aqi: number;
  qualityLevel: number;
}

export const AirQualityScale: FC<Props> = ({ aqi, qualityLevel }) => {
  return (
    <Scale>
      {airQualityLevelMutedColors.map((color, index) => {
        const isCorrespondingBlock = qualityLevel === index;
        return (
          <LevelBlock
            key={color}
            color={color}
            index={index}
            isCorrespondingBlock={isCorrespondingBlock}
            animate={{
              scale: isCorrespondingBlock ? 1.3 : 1,
              transition: { delay: TRANSITION_TIME, duration: TRANSITION_TIME, ease: EASE }
            }}
          >
            {qualityLevel === index && aqi}
          </LevelBlock>
        );
      })}
    </Scale>
  );
};
