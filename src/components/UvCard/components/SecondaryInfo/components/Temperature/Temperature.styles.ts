import styled from 'styled-components';
import { theme } from 'utils/constants';

export const TemperaturesFlexWrapper = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`;

export const MainTemperature = styled.h2`
  ${theme.textShadow}
`;

export const LimitTemperature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
