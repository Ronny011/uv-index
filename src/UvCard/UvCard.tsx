import { Body, Chip, Flower, Indicator, UvText } from './UvCard.styles';
import { NOT_FOUND } from './utils/constants';
import { Skeleton } from './components/Skeleton';
import { useGetCardData } from './hooks/useGetCardData';
import { SecondaryInfo } from './components/SecondaryInfo';
import { useEffect, useState } from 'react';

const LOW_UV_CUTOFF = 4;
const LOCALSTORAGE_MAX_UV_KEY = 'uvMax';
const UV_INDEX_EMPTY_STATE = { uv: 0, maxUv: 0, maxUvTime: '0' };

type MaxUvObject = {
  maxUv: number;
  maxUvTime: string;
};

const getLocalStorageMaxUv = (): MaxUvObject =>
  JSON.parse(localStorage.getItem(LOCALSTORAGE_MAX_UV_KEY) || `${UV_INDEX_EMPTY_STATE}`);

export const UvCard = () => {
  const [cachedMaxUvObject, setCachedMaxUvObject] = useState<MaxUvObject>(getLocalStorageMaxUv());
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
  const { town, country } = reverseGeolocation || {};
  const { uv, maxUv, maxUvTime } = uvIndexdata || UV_INDEX_EMPTY_STATE;

  const updateCachedMaxUv = (maxUv: number, maxUvTime: string) => {
    setCachedMaxUvObject(() => {
      localStorage.setItem(LOCALSTORAGE_MAX_UV_KEY, JSON.stringify({ maxUv, maxUvTime }));
      return { maxUv, maxUvTime };
    });
  };

  switch (true) {
    case geolocationError && isReverseGeolocationError:
      return <Body>{geolocationError}</Body>;

    case isReverseGeolocationError:
      return <Body>{reverseGeolocationError?.message}</Body>;

    case isUvIndexError:
      return <Body>{uvIndexError?.message}</Body>;
  }

  useEffect(() => {
    const { maxUv: localStorageMaxUv } = getLocalStorageMaxUv();

    (!localStorageMaxUv || Number(localStorageMaxUv) < maxUv) && updateCachedMaxUv(localStorageMaxUv, maxUvTime);
  }, [isUvIndexPeding]);

  return (
    <>
      {isReverseGeolocationPending ? (
        <Skeleton
          height={24}
          width={215}
        />
      ) : (
        <Body>
          UV index at {town}, {country}
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
            animate={{ rotate: 360, transition: { delay: 0.3, duration: 0.3, ease: 'easeInOut' } }}
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
