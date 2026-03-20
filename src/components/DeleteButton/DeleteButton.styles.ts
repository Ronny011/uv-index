import styled from 'styled-components';
import { theme } from 'utils/constants';

export const Button = styled.button`
  all: unset;
  color: rgb(199, 199, 199);
  cursor: pointer;

  &:hover {
    color: ${theme.primary};
  }
`;
