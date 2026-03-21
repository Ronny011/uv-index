export const MAX_UV = 12;
export const ARC_RADIUS = 80;
export const STROKE_WIDTH = 20;
export const CENTER_X = 110;
export const CENTER_Y = 100;

export const UV_LEVELS = [
  { min: 0, max: 3, color: '#16a34a' },
  { min: 3, max: 6, color: '#ca8a04' },
  { min: 6, max: 9, color: '#dc2626' },
  { min: 9, max: MAX_UV, color: '#7c3aed' }
];

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

const TRANSITION_ZONE = 1;

export const buildGradientStops = (uv: number) => {
  const clampedUv = Math.min(Math.max(uv, 0), MAX_UV);
  if (clampedUv === 0) return [];

  const stops: { offset: string; color: string }[] = [];

  const activeLevels = UV_LEVELS.filter((level) => level.min < clampedUv);

  activeLevels.forEach((level, index) => {
    const bandStart = level.min / clampedUv;
    const bandEnd = Math.min(level.max, clampedUv) / clampedUv;

    if (index === 0) {
      stops.push({ offset: `${bandStart * 100}%`, color: level.color });
    }

    const isLast = index === activeLevels.length - 1;
    if (isLast) {
      stops.push({ offset: `${bandEnd * 100}%`, color: level.color });
    } else {
      stops.push({ offset: `${Math.max(bandStart, bandEnd - TRANSITION_ZONE) * 100}%`, color: level.color });
      const nextColor = activeLevels[index + 1].color;
      stops.push({ offset: `${Math.min(1, bandEnd + TRANSITION_ZONE) * 100}%`, color: nextColor });
    }
  });

  return stops;
};

export const formatDisplayValue = (uv: number | undefined): string | number => {
  if (uv === undefined) return '–';
  return Number.isInteger(uv) ? uv : uv.toFixed(1);
};
