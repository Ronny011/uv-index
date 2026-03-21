import type { FC } from 'react';
import { FilledPath, IndexLabel, MeterWrapper, TrackPath, ValueLabel } from './UvMeter.styles';
import {
  buildFilledArcPath,
  buildGradientStops,
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

export const UvMeter: FC<Props> = ({ uv = 0 }) => {
  const percentage = Math.min(uv / MAX_UV, 1);
  const { x: arcEndX, y: arcEndY, largeArcFlag } = getArcEndpoint(percentage);
  const gradientStops = buildGradientStops(uv);
  const filledArcPath = percentage > 0 ? buildFilledArcPath(arcEndX, arcEndY, largeArcFlag) : '';

  return (
    <MeterWrapper>
      <svg
        viewBox='0 0 220 130'
        width='220'
        height='130'
      >
        <defs>
          <linearGradient
            id='uvArcGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
          >
            {gradientStops.map((stop, index) => (
              <stop
                key={index}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </linearGradient>
        </defs>

        <TrackPath
          d={FULL_ARC_PATH}
          strokeWidth={STROKE_WIDTH}
        />

        {percentage > 0 && (
          <FilledPath
            d={filledArcPath}
            stroke='url(#uvArcGradient)'
            strokeWidth={STROKE_WIDTH}
          />
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
