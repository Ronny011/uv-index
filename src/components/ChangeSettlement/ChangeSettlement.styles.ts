import styled from 'styled-components';

export const SettlementsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 25px;
  text-align: center;
`;

export const Settlement = styled.li`
  cursor: pointer;
  border: 1px solid transparent;
  padding: 8px;
  border-radius: 4px;
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

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  gap: 25px;
`;

export const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;
