import { SELECTED_LOCATION_KEY } from 'components/UvCard/hooks/useGetCardData';
import { FlexWrapper, ListItemWrapper, Settlement, SettlementsList } from './ChangeSettlement.styles';
import { DeleteButton } from 'components/DeleteButton';
import { Message } from 'components/AddSettlement/AddSettlement.styles';
import { useState } from 'react';
import { type SettlementLocalStorage, usePersistSettlements } from 'store/usePersistSettlements';

const RESERVED_ID = 3;

export const ChangeSettlement = () => {
  const [showMessage, setShowMessage] = useState(false);
  const settlements = usePersistSettlements((state) => state.settlements);
  const removeSettlement = usePersistSettlements((state) => state.removeSettlement);

  const handleSettlementClick = (settlement: SettlementLocalStorage) => {
    if (settlement.id === RESERVED_ID) {
      localStorage.removeItem(SELECTED_LOCATION_KEY);
      return;
    }

    localStorage.setItem(SELECTED_LOCATION_KEY, JSON.stringify(settlement));

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  return (
    <FlexWrapper>
      <Message>{showMessage ? 'Location set!' : ''}</Message>
      {settlements.length > 0 ? (
        <SettlementsList>
          {settlements.map((settlement) => (
            <ListItemWrapper key={settlement.id}>
              <Settlement onClick={() => handleSettlementClick(settlement)}>{settlement.name}</Settlement>
              {settlement.id !== RESERVED_ID && <DeleteButton onClick={() => removeSettlement(settlement.id)} />}
            </ListItemWrapper>
          ))}
        </SettlementsList>
      ) : (
        <h3>No locations were added</h3>
      )}
    </FlexWrapper>
  );
};
