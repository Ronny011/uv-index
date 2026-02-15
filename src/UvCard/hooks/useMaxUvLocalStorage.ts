import { useEffect, useState } from 'react';
import type { MaxUvObject } from 'types';

type Props = {
  localStorageKey: string;
  maxUv: number | undefined;
  maxUvTime: string | undefined;
  currentDate: string | undefined;
  townOrCity: string | undefined;
};

export const useMaxUvLocalStorage = ({ localStorageKey, maxUv, maxUvTime, currentDate, townOrCity }: Props) => {
  const [maxUvState, setMaxUvState] = useState<MaxUvObject>();

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
  }, [localStorageKey, townOrCity, maxUv, maxUvTime, currentDate]);

  return { maxUvState };
};
