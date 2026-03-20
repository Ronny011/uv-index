import { SELECTED_LOCATION_KEY } from 'components/UvCard/hooks/useGetCardData';
import {
  getSettlementsFromLocalStorage,
  SETTLEMENTS_KEY,
  type SettlementLocalStorage
} from '../AddSettlement/utils/helpers';
import { FlexWrapper, ListItemWrapper, Settlement, SettlementsList } from './ChangeSettlement.styles';
import { DeleteButton } from 'components/DeleteButton';
import { Message } from 'components/AddSettlement/AddSettlement.styles';
import { useState } from 'react';

const RESERVED_ID = 3;
const DEFAULT_LOCATION_OPTION: SettlementLocalStorage = { id: 3, lat: 0, lon: 0, name: 'Device location' };

export const ChangeSettlement = () => {
  const [showMessage, setShowMessage] = useState(false);

  const settlements = [DEFAULT_LOCATION_OPTION, ...getSettlementsFromLocalStorage()];

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

  const handleSettlementDelete = (idToDelete: number) => {
    const selectedLocation = JSON.parse(localStorage.getItem(SELECTED_LOCATION_KEY) || '{}') as SettlementLocalStorage;
    if (selectedLocation.id === idToDelete) localStorage.removeItem(SELECTED_LOCATION_KEY);

    const existingLocations = JSON.parse(localStorage.getItem(SETTLEMENTS_KEY) || '[]') as SettlementLocalStorage[];
    localStorage.setItem(SETTLEMENTS_KEY, JSON.stringify(existingLocations.filter(({ id }) => id === idToDelete)));
  };

  return (
    <FlexWrapper>
      <Message>{showMessage ? 'Location set as default!' : ''}</Message>
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
