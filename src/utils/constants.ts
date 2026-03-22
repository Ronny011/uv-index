export const STALE_TIME = 5 * 60 * 1000;

export const ISO_TIME_DELIMITER = 'T';

export const theme = {
  boxShadow: 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3)',
  textShadow: 'text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)',
  borderRadius: '20px',
  primary: 'rgb(255, 233, 229)'
};

export const TRANSITION_TIME = 0.3;
export const EASE = 'easeInOut';

export const APP_WIDTH = 250;
export const APP_HEIGHT = 377;

// Unified color scale for UV and Air Quality levels
// Used for both UV index (4 levels) and AQI (6 levels)
export const LEVEL_COLORS = {
  good: '#16a34a',
  moderate: '#facc15',
  unhealthyForSensitive: '#f97316',
  unhealthy: '#ef4444',
  veryUnhealthy: '#b91c1c',
  hazardous: '#7c3aed'
} as const;

export const AQI_LEVEL_COLORS = [
  LEVEL_COLORS.good,
  LEVEL_COLORS.moderate,
  LEVEL_COLORS.unhealthyForSensitive,
  LEVEL_COLORS.unhealthy,
  LEVEL_COLORS.veryUnhealthy,
  LEVEL_COLORS.hazardous
] as const;
