import type { FC } from 'react';
import { ButtonsWrapper, Button, Root } from './Navigator.styles';
import type { CardMode } from 'App';
import EditPencilIcon from '../../assets/icons/edit-pencil.svg?react';
import GlobeIcon from '../../assets/icons/globe.svg?react';
import PlusIcon from '../../assets/icons/plus.svg?react';
import SunIcon from '../../assets/icons/sun.svg?react';

type Props = {
  onNavigate: (mode: CardMode) => void;
};

export const Navigator: FC<Props> = ({ onNavigate }) => {
  return (
    <Root>
      <ButtonsWrapper>
        <Button onClick={() => onNavigate('changeSettlement')}>
          <EditPencilIcon />
          <GlobeIcon />
        </Button>
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
