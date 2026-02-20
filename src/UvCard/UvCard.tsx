import { Body, Flower, Indicator, UvText } from './UvCard.styles';
import { LOCALSTORAGE_MAX_UV_KEY, LOW_UV_CUTOFF, NOT_FOUND } from './utils/constants';
import { Skeleton } from './components/Skeleton';
import { useGetCardData } from './hooks/useGetCardData';
import { SecondaryInfo } from './components/SecondaryInfo';
import { useEffect } from 'react';
import { EASE, TRANSITION_TIME } from 'utils/constants';
import type { MaxUvObject } from 'types';
import { MaxUv } from './components/MaxUv';
import { useMaxUvLocalStorage } from './hooks/useMaxUvLocalStorage';

const wipeOldStorageRecords = (currentDate: string | undefined) => {
  if (!currentDate) return;

  Object.entries(localStorage).forEach(([key, value]) => {
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
  const { town, city, country, village } = reverseGeolocation || {};
  const locationName = town || city || village;
  const localStorageKey = `${LOCALSTORAGE_MAX_UV_KEY}_${locationName}`.replaceAll(' ', '_');
  const { maxUvState } = useMaxUvLocalStorage({ localStorageKey, maxUv, maxUvTime, currentDate, locationName });

  const uvValue = uv?.toString() ? (Number.isInteger(uv) ? uv : uv.toFixed(2)) : undefined;

  useEffect(() => wipeOldStorageRecords(currentDate), [currentDate]);

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
          UV in {locationName}, {country}
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
            <>{uvValue ? <UvText>{uvValue}</UvText> : <p>{NOT_FOUND}</p>}</>
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
