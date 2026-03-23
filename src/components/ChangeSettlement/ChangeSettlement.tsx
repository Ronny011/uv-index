import { FlexWrapper, ListItemWrapper, Settlement, SettlementsList } from './ChangeSettlement.styles';
import { DeleteButton } from 'components/DeleteButton';
import { type FC } from 'react';
import { type SettlementLocalStorage, usePersistSettlements } from 'store/usePersistSettlements';
import { usePersistSeletedSettlement } from 'store/usePersistSeletedSettlement';
import type { CardProps } from 'App';
import { Button } from 'App.styles';

const RESERVED_ID = 3;

export const ChangeSettlement: FC<CardProps> = ({ changeCardMode }) => {
  const settlements = usePersistSettlements((state) => state.settlements);
  const removeSettlement = usePersistSettlements((state) => state.removeSettlement);
  const setSelectedSettlement = usePersistSeletedSettlement((state) => state.setSelectedSettlement);
  const removeSelectedSettlement = usePersistSeletedSettlement((state) => state.removeSelectedSettlement);

  const handleSettlementClick = (settlement: SettlementLocalStorage) => {
    if (settlement.id === RESERVED_ID) {
      removeSelectedSettlement();
      changeCardMode('uv');
      return;
    }

    setSelectedSettlement(settlement);

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
      {settlements.length > 0 ? (
        <SettlementsList>
          {settlements.map((settlement) => (
            <ListItemWrapper key={settlement.id}>
              {settlement.id === RESERVED_ID ? (
                <Button onClick={() => handleSettlementClick(settlement)}>{settlement.name}</Button>
              ) : (
                <Settlement onClick={() => handleSettlementClick(settlement)}>{settlement.name}</Settlement>
              )}
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
