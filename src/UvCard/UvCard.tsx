import { Body, Flower, Indicator, UvText } from './UvCard.styles';
import { LOCALSTORAGE_MAX_UV_KEY, LOW_UV_CUTOFF, NOT_FOUND } from './utils/constants';
import { Skeleton } from './components/Skeleton';
import { useGetCardData } from './hooks/useGetCardData';
import { SecondaryInfo } from './components/SecondaryInfo';
import { useEffect, useState } from 'react';
import { EASE, TRANSITION_TIME } from 'utils/constants';
import type { MaxUvObject } from 'types';
import { MaxUv } from './components/MaxUv';

const wipeOldStorageRecords = (currentDate: string | undefined) => {
  if (!currentDate) return;

  Object.entries(localStorage).forEach(([key, value]) => {
    const parsedValue = JSON.parse(value) as MaxUvObject;
    const { date } = parsedValue;
    if (date !== currentDate) localStorage.removeItem(key);
  });
};

export const UvCard = () => {
  const [maxUvState, setMaxUvState] = useState<MaxUvObject>();

  const {
    geolocationError,
    reverseGeolocation,
    isReverseGeolocationPending,
    isReverseGeolocationError,
    reverseGeolocationError,
    uvIndexdata,
    isUvIndexPeding,
    isUvIndexError,
    uvIndexError,
    longitude,
    latitude
  } = useGetCardData();
  const { uv, maxUv, maxUvTime, currentDate } = uvIndexdata || {};
  const { town, city, country } = reverseGeolocation || {};
  const townOrCity = town || city;
  const localStorageKey = `${LOCALSTORAGE_MAX_UV_KEY}_${townOrCity}`.replace(' ', '_');

  useEffect(() => wipeOldStorageRecords(currentDate), [currentDate]);

  useEffect(() => {
    const getLocalStorageMaxUv = (): MaxUvObject | undefined => {
      const localStorageData = localStorage.getItem(localStorageKey);

      if (!localStorageData) return;
      return JSON.parse(localStorageData);
    };

    const updateCachedMaxUv = (maxUv: number | undefined, maxUvTime: string | undefined, date: string | undefined) => {
      if (!maxUv || !maxUvTime || !date) return;

      setMaxUvState(() => {
        localStorage.setItem(localStorageKey, JSON.stringify({ maxUv, maxUvTime, date }));
        return { maxUv, maxUvTime, date };
      });
    };

    const { maxUv: localStorageMaxUv } = getLocalStorageMaxUv() || {};
    const shouldUpdateLocalStorageMaxUv = !maxUvState || !localStorageMaxUv || localStorageMaxUv < (maxUv || 0);

    if (townOrCity && shouldUpdateLocalStorageMaxUv) updateCachedMaxUv(maxUv, maxUvTime, currentDate);
  }, [localStorageKey, townOrCity, maxUv, isUvIndexPeding, maxUvTime, currentDate]);

  switch (true) {
    case geolocationError && isReverseGeolocationError:
      return <Body>{geolocationError}</Body>;

    case isReverseGeolocationError:
      return <Body>{reverseGeolocationError?.message}</Body>;

    case isUvIndexError:
      return <Body>{uvIndexError?.message}</Body>;
  }

  return (
    <>
      {isReverseGeolocationPending ? (
        <Skeleton
          height={24}
          width={215}
        />
      ) : (
        <Body>
          UV in {townOrCity}, {country}
        </Body>
      )}

      <Indicator $isLoading={isUvIndexPeding}>
        {isUvIndexPeding ? (
          <Skeleton
            height={200}
            width={200}
            isRound
          />
        ) : (
          <Flower
            $isLowUv={Number(uv) < LOW_UV_CUTOFF}
            animate={{
              rotate: 360,
              transition: { delay: TRANSITION_TIME, duration: TRANSITION_TIME, ease: EASE }
            }}
          >
            <>{Number.isInteger(uv) ? <UvText>{Number(uv?.toFixed(2))}</UvText> : <p>{NOT_FOUND}</p>}</>
          </Flower>
        )}
      </Indicator>

      {isUvIndexPeding ? (
        <Skeleton
          height={34}
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
