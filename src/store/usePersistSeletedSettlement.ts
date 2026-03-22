import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SettlementLocalStorage } from './usePersistSettlements';

export const SELECTED_LOCATION_KEY = 'selected-location';

type State = { selectedSettlement: SettlementLocalStorage | undefined };

type Actions = {
  setSeletecSettlement: (settlement: SettlementLocalStorage) => void;
  removeSelectedSettlement: () => void;
};

export const usePersistSeletedSettlement = create<State & Actions>()(
  persist<State & Actions>(
    (set) => ({
      selectedSettlement: undefined,
      setSeletecSettlement: (settlement) => set(() => ({ selectedSettlement: settlement })),
      removeSelectedSettlement: () => set(() => ({ selectedSettlement: undefined }))
    }),
    { name: SELECTED_LOCATION_KEY }
  )
);
