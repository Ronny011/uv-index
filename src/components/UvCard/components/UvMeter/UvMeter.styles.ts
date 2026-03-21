import styled from 'styled-components';

export const MeterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

export const TrackPath = styled.path`
  fill: none;
  stroke: #e5e7eb;
  stroke-linecap: round;
`;

export const FilledPath = styled.path`
  fill: none;
  stroke-linecap: round;
`;

export const ValueLabel = styled.text`
  text-anchor: middle;
  fill: currentColor;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -1px;
`;

export const IndexLabel = styled.text`
  text-anchor: middle;
  fill: currentColor;
  opacity: 0.5;
  font-size: 10px;
  letter-spacing: 2.5px;
`;
