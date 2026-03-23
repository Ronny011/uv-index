import styled from 'styled-components';
import { theme } from 'utils/constants';

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SettlementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: center;
`;

export const Settlement = styled.li`
  cursor: pointer;
  border: 1px solid transparent;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s ease;

  @media (hover: hover) {
    &:hover {
      border: 1px solid #ccc;
    }
  }

  &:active {
    border: 1px solid #ccc;
    opacity: 0.7;
  }
`;

export const Input = styled.input`
  all: unset;
  border: 3px solid ${theme.primary};
  border-radius: 10px;
  padding: 10px;
  min-height: 44px;
  box-sizing: border-box;
  font-size: 16px;
`;
