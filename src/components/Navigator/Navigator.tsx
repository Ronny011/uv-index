import { type FC } from 'react';
import { ButtonsWrapper, Button, Root } from './Navigator.styles';
import type { CardMode } from 'App';
import EditPencilIcon from '../../assets/icons/edit-pencil.svg?react';
import { usePersistSettlements } from 'store/usePersistSettlements';
import { GlobeIcon, PlusIcon, SunIcon } from 'assets/icons';

type Props = {
  onNavigate: (mode: CardMode) => void;
};

export const Navigator: FC<Props> = ({ onNavigate }) => {
  const settlements = usePersistSettlements((state) => state.settlements);

  return (
    <Root>
      <ButtonsWrapper>
        {settlements.length > 1 && (
          <Button onClick={() => onNavigate('changeSettlement')}>
            <EditPencilIcon />
            <GlobeIcon />
          </Button>
        )}
        <Button onClick={() => onNavigate('addSettlement')}>
          <PlusIcon />
          <GlobeIcon />
        </Button>
        <Button onClick={() => onNavigate('uv')}>
          <SunIcon />
        </Button>
      </ButtonsWrapper>
    </Root>
  );
};
