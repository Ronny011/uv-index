import { Body } from './UvCard.styles';
import { UvMeter } from './components/UvMeter';
import { LOCALSTORAGE_MAX_UV_KEY } from './utils/constants';
import { Skeleton } from './components/Skeleton';
import { useGetCardData } from './hooks/useGetCardData';
import { SecondaryInfo } from './components/SecondaryInfo';
import { useEffect } from 'react';

import type { MaxUvObject } from 'types';
import { MaxUv } from './components/MaxUv';
import { useMaxUvLocalStorage } from './hooks/useMaxUvLocalStorage';
import { SETTLEMENTS_KEY } from 'store/usePersistSettlements';
import { SELECTED_LOCATION_KEY } from 'store/usePersistSeletedSettlement';

const keysToExclude = [SETTLEMENTS_KEY, SELECTED_LOCATION_KEY];

const wipeOldStorageRecords = (currentDate: string | undefined) => {
  if (!currentDate) return;

  Object.entries(localStorage).forEach(([key, value]) => {
    if (keysToExclude.includes(key)) return;

    const parsedValue = JSON.parse(value) as MaxUvObject;
    const { date } = parsedValue;
    if (date !== currentDate) localStorage.removeItem(key);
  });
};

export const UvCard = () => {
  const {
    geolocationError,
    reverseGeolocation,
    isReverseGeolocationPending,
    reverseGeolocationError,
    uvIndexdata,
    isUvIndexPeding,
    uvIndexError,
    longitude,
    latitude
  } = useGetCardData();
  const { uv, maxUv, maxUvTime, currentDate } = uvIndexdata || {};

  const { town, city, country, village } = reverseGeolocation || {};
  const locationName = town || city || village;
  const localStorageKey = `${LOCALSTORAGE_MAX_UV_KEY}_${locationName}`.replaceAll(' ', '_');
  const { maxUvState } = useMaxUvLocalStorage({ localStorageKey, maxUv, maxUvTime, currentDate, locationName });

  useEffect(() => wipeOldStorageRecords(currentDate), [currentDate]);

  switch (true) {
    case geolocationError && Boolean(reverseGeolocationError):
      return <Body>{geolocationError}</Body>;

    case Boolean(reverseGeolocationError):
      return <Body>{reverseGeolocationError?.message}</Body>;

    case Boolean(uvIndexError):
      return <Body>{uvIndexError?.message}</Body>;
  }

  return (
    <>
      {isReverseGeolocationPending ? (
        <Skeleton
          height={18}
          width={215}
        />
      ) : (
        <Body>
          {locationName}, {country}
        </Body>
      )}

      {isUvIndexPeding ? (
        <Skeleton
          height={130}
          width={200}
          margin='10px 0'
        />
      ) : (
        <UvMeter uv={uv} />
      )}

      {isUvIndexPeding ? (
        <Skeleton
          height={28}
          width={215}
        />
      ) : (
        <MaxUv maxUvObject={maxUvState} />
      )}

      <SecondaryInfo
        longitude={longitude}
        latitude={latitude}
      />
    </>
  );
};
