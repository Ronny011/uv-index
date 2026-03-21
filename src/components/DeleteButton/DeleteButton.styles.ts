import styled from 'styled-components';
import { theme } from 'utils/constants';

export const Button = styled.button`
  all: unset;
  color: rgb(199, 199, 199);
  cursor: pointer;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.15s ease;

  @media (hover: hover) {
    &:hover {
      color: ${theme.primary};
    }
  }

  &:active {
    color: ${theme.primary};
    opacity: 0.7;
  }
`;
