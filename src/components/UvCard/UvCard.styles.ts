import styled from 'styled-components';

export const GREEN_UV = 'linear-gradient(60deg, #56ab2f, #a8e063)';
export const RED_UV = 'linear-gradient(60deg, #ed303c, #ff9c5b);';

export const Body = styled.span<{ $topMargin?: number }>`
  margin-top: ${({ $topMargin }) => $topMargin || 0}px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;
