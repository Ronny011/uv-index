import { useEffect, useState } from 'react';
import { useSearchSettlements } from 'api/queries/useMultiLocation';
import { Button, FlexBox, Input, Message, Settlement, SettlementsList } from './AddSettlement.styles';
import type { SettlementResponse } from 'types';
import { getCountry } from 'utils/helpers';
import { usePersistSettlements } from 'store/usePersistSettlements';

export const AddSettlement = () => {
  const [query, setQuery] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [shouldQuery, setShouldQuery] = useState(false);
  const addSettlementsToLocalStorage = usePersistSettlements((state) => state.addSettlement);

  const { data, isSuccess } = useSearchSettlements(query, shouldQuery);

  const handleSettlementClick = (settlement: SettlementResponse) => {
    const { lat, lon, name, place_id } = settlement;

    const settlementObject = { lat, lon, name, id: place_id };
    addSettlementsToLocalStorage(settlementObject);

    setQuery('');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  const handleSave = () => setShouldQuery(true);

  useEffect(() => {
    setShouldQuery(false);
  }, [isSuccess]);

  return (
    <FlexBox>
      <Message>{showMessage ? 'Location added!' : ''}</Message>
      <Input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
