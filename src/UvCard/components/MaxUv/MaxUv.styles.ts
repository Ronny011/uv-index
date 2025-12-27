import styled from 'styled-components';
import { theme } from 'utils/constants';
import { GREEN_UV, RED_UV } from 'UvCard/UvCard.styles';

export const Chip = styled.div<{ $isLowUv: boolean }>`
  background: ${({ $isLowUv }) => ($isLowUv ? GREEN_UV : RED_UV)};
  color: white;
  padding: 5px;
  padding-inline: 10px;
  border-radius: ${theme.borderRadius};
  ${theme.boxShadow}
`;
