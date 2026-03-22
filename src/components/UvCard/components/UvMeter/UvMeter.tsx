import type { FC } from 'react';
import { FilledPath, IndexLabel, MeterWrapper, TrackPath, ValueLabel } from './UvMeter.styles';
import {
  buildFilledArcPath,
  buildConicGradient,
  CENTER_X,
  CENTER_Y,
  formatDisplayValue,
  FULL_ARC_PATH,
  getArcEndpoint,
  MAX_UV,
  STROKE_WIDTH
} from './utils/helpers';

type Props = {
  uv: number | undefined;
};

const conicGradient = buildConicGradient();

export const UvMeter: FC<Props> = ({ uv = 0 }) => {
  const percentage = Math.min(uv / MAX_UV, 1);
  const { x: arcEndX, y: arcEndY, largeArcFlag } = getArcEndpoint(percentage);
  const filledArcPath = percentage > 0 ? buildFilledArcPath(arcEndX, arcEndY, largeArcFlag) : '';

  return (
    <MeterWrapper>
      <svg
        viewBox='0 0 220 130'
        width='220'
        height='130'
      >
        <defs>
          <mask id='uvArcMask'>
            <rect
              x='0'
              y='0'
              width='220'
              height='130'
              fill='black'
            />
            {percentage > 0 && (
              <FilledPath
                d={filledArcPath}
                stroke='white'
                strokeWidth={STROKE_WIDTH}
              />
            )}
          </mask>
        </defs>

        <TrackPath
          d={FULL_ARC_PATH}
          strokeWidth={STROKE_WIDTH}
        />

        {percentage > 0 && (
          <foreignObject
            x='0'
            y='0'
            width='220'
            height='130'
            mask='url(#uvArcMask)'
          >
            <div
              style={{
                width: '220px',
                height: '130px',
                background: conicGradient
              }}
            />
          </foreignObject>
        )}

        <ValueLabel
          x={CENTER_X}
          y={CENTER_Y - 10}
        >
          {formatDisplayValue(uv)}
        </ValueLabel>
        <IndexLabel
          x={CENTER_X}
          y={CENTER_Y + 10}
        >
          UV INDEX
        </IndexLabel>
      </svg>
    </MeterWrapper>
  );
};
