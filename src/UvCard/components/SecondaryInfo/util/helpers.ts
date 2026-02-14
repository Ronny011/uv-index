import { AqiHealth } from 'UvCard/utils/constants';

type AqiHealthObject = { message: string; level: number };

export const getAqiHealth = (aqi: number): AqiHealthObject => {
  switch (true) {
    case aqi >= 0 && aqi <= 50:
      return { message: AqiHealth.Good, level: 0 };

    case aqi >= 51 && aqi <= 100:
      return { message: AqiHealth.Moderate, level: 1 };

    case aqi >= 101 && aqi <= 150:
      return { message: AqiHealth.UnhealthyForSensitiveGroups, level: 2 };

    case aqi >= 151 && aqi <= 200:
      return { message: AqiHealth.Unhealthy, level: 3 };

    case aqi >= 201 && aqi <= 300:
      return { message: AqiHealth.VeryUnhealthy, level: 4 };

    case aqi >= 301:
      return { message: AqiHealth.Hazardous, level: 5 };

    default:
      return { message: AqiHealth.OutOfScale, level: 6 };
  }
};
