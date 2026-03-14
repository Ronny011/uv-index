import { commonWrapper } from 'App.styles';
import styled from 'styled-components';

export const Root = styled.nav`
  ${commonWrapper}
`;

export const Button = styled.button`
  all: unset;
  border: 1px solid transparent;
  border-radius: 20px;
  padding: 20px;

  &:hover {
    border: 1px solid gray;
  }
`;

export const ButtonsWrapper = styled.div`
  cursor: pointer;
  display: flex;
  gap: 10px;
`;
