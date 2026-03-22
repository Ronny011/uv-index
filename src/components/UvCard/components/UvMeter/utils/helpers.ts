import { LEVEL_COLORS } from 'utils/constants';

export const MAX_UV = 12;
export const ARC_RADIUS = 80;
export const STROKE_WIDTH = 20;
export const CENTER_X = 110;
export const CENTER_Y = 100;

const BAND = MAX_UV / 6;

export const UV_LEVELS = [
  { min: 0, max: BAND, color: LEVEL_COLORS.good },
  { min: BAND, max: BAND * 2, color: LEVEL_COLORS.moderate },
  { min: BAND * 2, max: BAND * 3, color: LEVEL_COLORS.unhealthyForSensitive },
  { min: BAND * 3, max: BAND * 4, color: LEVEL_COLORS.unhealthy },
  { min: BAND * 4, max: BAND * 5, color: LEVEL_COLORS.veryUnhealthy },
  { min: BAND * 5, max: MAX_UV, color: LEVEL_COLORS.hazardous }
];

export const getUvColor = (uv: number): string => {
  const level = UV_LEVELS.find((level) => uv >= level.min && uv < level.max);
  return level?.color ?? UV_LEVELS[UV_LEVELS.length - 1].color;
};

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const getArcEndpoint = (percentage: number) => {
  const angle = percentage * 180;
  const endAngle = -180 + angle;

  return {
    x: CENTER_X + ARC_RADIUS * Math.cos(toRadians(endAngle)),
    y: CENTER_Y + ARC_RADIUS * Math.sin(toRadians(endAngle)),
    largeArcFlag: angle > 180 ? 1 : 0
  };
};

export const buildFilledArcPath = (endX: number, endY: number, largeArcFlag: number) => {
  const startX = CENTER_X - ARC_RADIUS;
  const startY = CENTER_Y;
  return `M ${startX} ${startY} A ${ARC_RADIUS} ${ARC_RADIUS} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
};

export const FULL_ARC_PATH = `M ${CENTER_X - ARC_RADIUS} ${CENTER_Y} A ${ARC_RADIUS} ${ARC_RADIUS} 0 0 1 ${CENTER_X + ARC_RADIUS} ${CENTER_Y}`;

const ARC_SWEEP_DEGREES = 180;

export const buildConicGradient = () => {
  const colorStops = UV_LEVELS.map((level) => `${level.color} ${(level.max / MAX_UV) * ARC_SWEEP_DEGREES}deg`);

  return `conic-gradient(from 270deg at ${CENTER_X}px ${CENTER_Y}px, ${UV_LEVELS[0].color} 0deg, ${colorStops.join(', ')}, ${UV_LEVELS[0].color} 360deg)`;
};

export const formatDisplayValue = (uv: number | undefined): string | number => {
  if (uv === undefined) return '–';
  return Number.isInteger(uv) ? uv : uv.toFixed(1);
};
