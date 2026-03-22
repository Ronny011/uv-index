import { FlexWrapper, ListItemWrapper, Settlement, SettlementsList } from './ChangeSettlement.styles';
import { DeleteButton } from 'components/DeleteButton';
import { Message } from 'components/AddSettlement/AddSettlement.styles';
import { type FC, useState } from 'react';
import { type SettlementLocalStorage, usePersistSettlements } from 'store/usePersistSettlements';
import { usePersistSeletedSettlement } from 'store/usePersistSeletedSettlement';
import type { CardProps } from 'App';

const RESERVED_ID = 3;

export const ChangeSettlement: FC<CardProps> = ({ changeCardMode }) => {
  const [showMessage, setShowMessage] = useState(false);
  const settlements = usePersistSettlements((state) => state.settlements);
  const removeSettlement = usePersistSettlements((state) => state.removeSettlement);
  const setSeletecSettlement = usePersistSeletedSettlement((state) => state.setSeletecSettlement);
  const removeSelectedSettlement = usePersistSeletedSettlement((state) => state.removeSelectedSettlement);

  const handleSettlementClick = (settlement: SettlementLocalStorage) => {
    if (settlement.id === RESERVED_ID) {
      removeSelectedSettlement();
      changeCardMode('uv');
      return;
    }

    setSeletecSettlement(settlement);

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
    changeCardMode('uv');
  };

  const handleSettlementDelete = (id: number) => {
    removeSettlement(id);

    if (settlements.length === 2) {
      removeSelectedSettlement();
      changeCardMode('addSettlement');
    }
  };

  return (
    <FlexWrapper>
      <Message>{showMessage ? 'Location set!' : ''}</Message>
      {settlements.length > 0 ? (
        <SettlementsList>
          {settlements.map((settlement) => (
            <ListItemWrapper key={settlement.id}>
              <Settlement onClick={() => handleSettlementClick(settlement)}>{settlement.name}</Settlement>
              {settlement.id !== RESERVED_ID && <DeleteButton onClick={() => handleSettlementDelete(settlement.id)} />}
            </ListItemWrapper>
          ))}
        </SettlementsList>
      ) : (
        <h3>No locations were added</h3>
      )}
    </FlexWrapper>
  );
};
