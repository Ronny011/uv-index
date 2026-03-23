import { type FC, useEffect, useRef, useState } from 'react';
import { useSearchSettlements } from 'api/queries/useMultiLocation';
import { FlexBox, Input, Settlement, SettlementsList } from './AddSettlement.styles';
import type { SettlementResponse } from 'types';
import { getCountry } from 'utils/helpers';
import { usePersistSettlements } from 'store/usePersistSettlements';
import type { CardProps } from 'App';
import { Button } from 'App.styles';
import { usePersistSeletedSettlement } from 'store/usePersistSeletedSettlement';

export const AddSettlement: FC<CardProps> = ({ changeCardMode }) => {
  const [query, setQuery] = useState('');
  const [shouldQuery, setShouldQuery] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addSettlementsToLocalStorage = usePersistSettlements((state) => state.addSettlement);
  const setSelectedSettlement = usePersistSeletedSettlement((state) => state.setSelectedSettlement);

  const { data, isSuccess } = useSearchSettlements(query, shouldQuery);

  const handleSettlementClick = (settlement: SettlementResponse) => {
    const { lat, lon, name, place_id } = settlement;

    const settlementObject = { lat, lon, name, id: place_id };
    addSettlementsToLocalStorage(settlementObject);
    setSelectedSettlement({ ...settlement, id: settlement.place_id });

    changeCardMode('uv');
  };

  const handleSave = () => setShouldQuery(true);

  useEffect(() => {
    setShouldQuery(false);
  }, [isSuccess]);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <FlexBox>
      <Input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Enter full city name'
        ref={inputRef}
      />
      <Button onClick={handleSave}>Search</Button>
      <SettlementsList>
        {data?.map((settlement) => (
          <Settlement
            key={settlement.place_id}
            onClick={() => handleSettlementClick(settlement)}
          >
            {`${settlement.name}, ${getCountry(settlement)}`}
          </Settlement>
        ))}
      </SettlementsList>
    </FlexBox>
  );
};
