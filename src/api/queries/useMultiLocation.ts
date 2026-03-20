import { useQuery } from '@tanstack/react-query';
import { getSettlements } from 'api/multiLocation';
import type { SettlementResponse } from 'types';
import { getCountry } from 'utils/helpers';

const compareSettlements = (baseSettlement: SettlementResponse, compareSettlement: SettlementResponse) => {
  const baseName = baseSettlement.name;
  const baseCountry = getCountry(baseSettlement);

  const dedupName = compareSettlement.name;
  const dedupCountry = getCountry(compareSettlement);

  return dedupName === baseName && dedupCountry === baseCountry;
};

const getDeduplicatedSettlements = async (query: string) => {
  const response = await getSettlements(query);
  const deduplicatedSettlements = response;

  response.map((baseSettlement) => {
    while (
      deduplicatedSettlements.filter((compareSettlement) => compareSettlements(baseSettlement, compareSettlement))
        .length > 1
    ) {
      const duplicateSettlementIndex = deduplicatedSettlements.findLastIndex((compareSettlement) =>
        compareSettlements(baseSettlement, compareSettlement)
      );

      deduplicatedSettlements.splice(duplicateSettlementIndex, 1);
    }
  });

  return deduplicatedSettlements;
};

export const useSearchSettlements = (query: string, shouldQuery: boolean) => {
  return useQuery({
    queryFn: () => getDeduplicatedSettlements(query),
    queryKey: ['settlements', query],
    enabled: shouldQuery && Boolean(query)
  });
};
