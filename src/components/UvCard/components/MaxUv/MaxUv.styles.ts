import styled from 'styled-components';
import { theme } from 'utils/constants';
import { getUvColor } from '../UvMeter/utils/helpers';

export const Chip = styled.div<{ $uv: number }>`
  background: ${({ $uv }) => getUvColor($uv)};
  color: white;
  padding: 5px;
  padding-inline: 10px;
  border-radius: ${theme.borderRadius};
`;
