import type { FC } from 'react';
import CloseIcon from '../../assets/icons/close-icon.svg?react';
import { Button } from './DeleteButton.styles';

type Props = { onClick: () => void };

export const DeleteButton: FC<Props> = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <CloseIcon />
    </Button>
  );
};
