import styled from 'styled-components';
import { theme } from 'utils/constants';

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin-top: 100px;
`;

export const Message = styled.p`
  margin: 0;
  padding: 0;

  height: 16px;
  color: #008b58;
`;

export const SettlementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
`;

export const Settlement = styled.li`
  cursor: pointer;
  border: 1px solid transparent;
  padding: 5px;
  border-radius: 4px;

  &:hover {
    border: 1px solid #ccc;
  }
`;

export const Input = styled.input`
  all: unset;
  border: 3px solid ${theme.primary};
  border-radius: 4px;
  padding: 5px;
`;

export const Button = styled.button`
  all: unset;
  background-color: ${theme.primary};
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    ${theme.boxShadow}
  }
`;
