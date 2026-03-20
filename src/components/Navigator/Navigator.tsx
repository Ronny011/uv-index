import type { FC } from 'react';
import { ButtonsWrapper, Button, Root } from './Navigator.styles';
import type { CardMode } from 'App';

type Props = {
  onNavigate: (mode: CardMode) => void;
};

export const Navigator: FC<Props> = ({ onNavigate }) => {
  return (
    <Root>
      <ButtonsWrapper>
        <Button onClick={() => onNavigate('changeSettlement')}>Change location</Button>
        <Button onClick={() => onNavigate('addSettlement')}>Add location</Button>
        <Button onClick={() => onNavigate('uv')}>UV</Button>
      </ButtonsWrapper>
    </Root>
  );
};
