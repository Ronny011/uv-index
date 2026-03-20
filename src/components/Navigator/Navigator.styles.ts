import { commonWrapper } from 'App.styles';
import styled from 'styled-components';
import { theme } from 'utils/constants';

export const Root = styled.nav`
  ${commonWrapper}
`;

export const Button = styled.button`
  all: unset;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  gap: 5px;

  &:hover {
    color: ${theme.primary};
  }
`;

export const ButtonsWrapper = styled.div`
  cursor: pointer;
  display: flex;
  gap: 10px;
`;
