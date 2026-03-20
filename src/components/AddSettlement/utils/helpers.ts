import type { SettlementResponse } from 'types';

export const SETTLEMENTS_KEY = 'settlements';

export type SettlementLocalStorage = Omit<SettlementResponse, 'place_id' | 'display_name'> & { id: number };

export const saveSettlementsToLocalStorage = (settlement: SettlementLocalStorage) => {
  const settlements = localStorage.getItem(SETTLEMENTS_KEY);

  const settlementsArray = settlements ? JSON.parse(settlements) : [];
  settlementsArray.push(settlement);

  const dedupedSettlements = [...new Set(settlementsArray)];
  localStorage.setItem(SETTLEMENTS_KEY, JSON.stringify(dedupedSettlements));
};

export const getSettlementsFromLocalStorage = (): SettlementLocalStorage[] => {
  const settlements = localStorage.getItem(SETTLEMENTS_KEY);
  return settlements ? JSON.parse(settlements) : [];
};
