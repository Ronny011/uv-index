export const STALE_TIME = 5 * 60 * 1000;

export enum AqiHealth {
  Good = 'Good',
  Moderate = 'Moderate',
  UnhealthyForSensitiveGroups = 'Unhealthy for sensitive groups',
  Unhealthy = 'Unhealthy',
  VeryUnhealthy = 'Very unhealthy',
  Hazardous = 'Hazardous',
  OutOfScale = 'Value not in scale'
}
