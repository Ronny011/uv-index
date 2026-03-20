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
  padding: 5px;
  border-radius: 4px;

  &:hover {
    border: 1px solid #ccc;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow-y: scroll;
  gap: 25px;
`;

export const ListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
`;
