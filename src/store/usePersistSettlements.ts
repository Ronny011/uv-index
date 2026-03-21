import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SettlementResponse } from 'types';

export const SETTLEMENTS_KEY = 'settlements';

export type SettlementLocalStorage = Omit<SettlementResponse, 'place_id' | 'display_name'> & { id: number };

const DEFAULT_LOCATION_OPTION: SettlementLocalStorage = { id: 3, lat: 0, lon: 0, name: 'Device location' };

type State = { settlements: SettlementLocalStorage[] };

type Actions = {
  addSettlement: (newSettlement: SettlementLocalStorage) => void;
  removeSettlement: (id: number) => void;
};

export const usePersistSettlements = create<State & Actions>()(
  persist(
    (set) => ({
      settlements: [DEFAULT_LOCATION_OPTION],
      addSettlement: (newSettlement) => set((state) => ({ settlements: [...state.settlements, newSettlement] })),
      removeSettlement: (id) => set((state) => ({ settlements: state.settlements.filter((item) => item.id !== id) }))
    }),
    { name: SETTLEMENTS_KEY }
  )
);
