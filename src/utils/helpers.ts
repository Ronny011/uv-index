import type { SettlementResponse } from 'types';

export const getCountry = (settlement: SettlementResponse) => {
  return settlement.display_name.split(',').pop()?.trim();
};
