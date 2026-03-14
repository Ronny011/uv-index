import { ButtonsWrapper, Button, Root } from './Navigator.styles';
import type { CardMode } from 'App';

export const Navigator = ({ onNavigate }: { onNavigate: (mode: CardMode) => void }) => {
  return (
    <Root>
      <ButtonsWrapper>
        <Button onClick={() => onNavigate('changeCity')}>Change city</Button>
        <Button onClick={() => onNavigate('addCity')}>Add city</Button>
        <Button onClick={() => onNavigate('uv')}>UV</Button>
      </ButtonsWrapper>
    </Root>
  );
};
