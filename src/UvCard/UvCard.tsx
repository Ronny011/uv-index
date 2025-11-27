import { Body, Chip, Flower, Indicator, UvText } from './UvCard.styles';
import {
  LOCALSTORAGE_MAX_UV_KEY,
  LOW_UV_CUTOFF,
  MAX_UV_OBJECT_EMPTY_STATE,
  NOT_FOUND,
  UV_INDEX_EMPTY_STATE
} from './utils/constants';
import { Skeleton } from './components/Skeleton';
import { useGetCardData } from './hooks/useGetCardData';
import { SecondaryInfo } from './components/SecondaryInfo';
import { useEffect, useState } from 'react';
import { EASE, TRANSITION_TIME } from 'utils/constants';
import type { MaxUvObject } from 'types';
import { useMountEffect } from 'hooks/useMountEffect';

const wipeOldStorageRecords = (currentDate: string) => {
  Object.entries(localStorage).forEach(([key, value]) => {
    const parsedValue = JSON.parse(value) as MaxUvObject;
    const { date } = parsedValue;
    if (date !== currentDate) localStorage.removeItem(key);
  });
};

export const UvCard = () => {
  const [cachedMaxUvObject, setCachedMaxUvObject] = useState<MaxUvObject>(MAX_UV_OBJECT_EMPTY_STATE);
  const { maxUv: cachedMaxUv, maxUvTime: cachedMaxUvTime } = cachedMaxUvObject;

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
  const { uv, maxUv, maxUvTime, currentDate } = uvIndexdata || UV_INDEX_EMPTY_STATE;
  const { town, city, country } = reverseGeolocation || {};
  const townOrCity = town || city;
  const localStorageKey = `${LOCALSTORAGE_MAX_UV_KEY}_${townOrCity}`.replace(' ', '_');

  useMountEffect(() => wipeOldStorageRecords(currentDate));

  useEffect(() => {
    const getLocalStorageMaxUv = (): MaxUvObject =>
      JSON.parse(localStorage.getItem(localStorageKey) || JSON.stringify(UV_INDEX_EMPTY_STATE));

    const updateCachedMaxUv = (maxUv: number, maxUvTime: string, date: string) => {
      setCachedMaxUvObject(() => {
        localStorage.setItem(localStorageKey, JSON.stringify({ maxUv, maxUvTime, date }));
        return { maxUv, maxUvTime, date };
      });
    };

    const { maxUv: localStorageMaxUv } = getLocalStorageMaxUv();

    if (townOrCity && (!localStorageMaxUv || Number(localStorageMaxUv) < maxUv))
      updateCachedMaxUv(maxUv, maxUvTime, currentDate);
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
            <>{uv || Number.isInteger(uv) ? <UvText>{Number(uv.toFixed(2))}</UvText> : <p>{NOT_FOUND}</p>}</>
          </Flower>
        )}
      </Indicator>

      {isUvIndexPeding ? (
        <Skeleton
          height={34}
          width={215}
        />
      ) : (
        <Body>
          Max UV today:
          <Chip $isLowUv={Number(cachedMaxUv) < LOW_UV_CUTOFF}>{parseFloat(Number(cachedMaxUv).toFixed(2))}</Chip>
          at {cachedMaxUvTime}
        </Body>
      )}

      <SecondaryInfo
        longitude={longitude}
        latitude={latitude}
      />
    </>
  );
};
