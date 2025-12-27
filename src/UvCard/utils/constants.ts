export const INVALID_LAT_LONG = 0;
export const NOT_FOUND = 'not found';

export enum AqiHealth {
  Good = 'Good',
  Moderate = 'Moderate',
  UnhealthyForSensitiveGroups = 'Unhealthy for sensitive groups',
  Unhealthy = 'Unhealthy',
  VeryUnhealthy = 'Very unhealthy',
  Hazardous = 'Hazardous',
  OutOfScale = 'Value not in scale'
}

export const LOW_UV_CUTOFF = 4;
export const LOCALSTORAGE_MAX_UV_KEY = 'uvMax';
