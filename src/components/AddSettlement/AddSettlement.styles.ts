import styled from 'styled-components';
import { theme } from 'utils/constants';

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
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
  padding: 8px;
  border-radius: 4px;
  min-height: 44px;
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
  border-radius: 4px;
  padding: 10px;
  min-height: 44px;
  box-sizing: border-box;
  font-size: 16px;
`;

export const Button = styled.button`
  all: unset;
  background-color: ${theme.primary};
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  min-height: 44px;
  box-sizing: border-box;
  transition:
    box-shadow 0.15s ease,
    opacity 0.15s ease;

  @media (hover: hover) {
    &:hover {
      ${theme.boxShadow}
    }
  }

  &:active {
    ${theme.boxShadow}
    opacity: 0.7;
  }
`;
