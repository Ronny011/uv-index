import { Body, Chip, Flower, Indicator, UvText } from './UvCard.styles';
import { NOT_FOUND } from './utils/constants';
import { Skeleton } from './components/Skeleton';
import { useGetCardData } from './hooks/useGetCardData';
import { SecondaryInfo } from './components/SecondaryInfo';
import { useEffect } from 'react';

const LOW_UV_CUTOFF = 4;
const LOCALSTORAGE_MAX_UV_KEY = 'uvMax';

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
  const { city, country } = reverseGeolocation || {};
  const { uv, maxUv, maxUvTime } = uvIndexdata || { uv: 0, maxUv: 0 };
  const cachedMaxUv = localStorage.getItem(LOCALSTORAGE_MAX_UV_KEY);

  switch (true) {
    case geolocationError && isReverseGeolocationError:
      return <Body>{geolocationError}</Body>;

    case isReverseGeolocationError:
      return <Body>{reverseGeolocationError?.message}</Body>;

    case isUvIndexError:
      return <Body>{uvIndexError?.message}</Body>;
  }

  useEffect(() => {
    if (!cachedMaxUv) {
      localStorage.setItem(LOCALSTORAGE_MAX_UV_KEY, String(maxUv ?? 0));
    } else {
      Number(cachedMaxUv) < maxUv && localStorage.setItem(LOCALSTORAGE_MAX_UV_KEY, String(maxUv));
    }
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
          UV index at {city}, {country}
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
          at {maxUvTime}
        </Body>
      )}

      <SecondaryInfo
        longitude={longitude}
        latitude={latitude}
      />
    </>
  );
};
