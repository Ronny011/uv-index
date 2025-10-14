import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { theme } from 'utils/constants';

export const firstBlock = (index: number) => (index === 0 ? theme.borderRadius : 0);
export const lastBlock = (index: number) => (index === 5 ? theme.borderRadius : 0);

export const airQualityLevelColors = [
  '#00E400', // Good (0-50)
  '#FFFF00', // Moderate (51-100)
  '#FF7E00', // Unhealthy for Sensitive Groups (101-150)
  '#FF0000', // Unhealthy (151-200)
  '#8F3F97', // Very Unhealthy (201-300)
  '#7E0023' // Hazardous (301+)
];

export const Scale = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 240px;
  height: 20px;
  border-radius: ${theme.borderRadius};
`;

export const LevelBlock = styled(motion.div)<{ color: string; index: number; isCorrespondingBlock: boolean }>(
  ({ color, index, isCorrespondingBlock }) => css`
    background-color: ${color};
    text-align: center;
    border-radius: ${firstBlock(index)} ${lastBlock(index)} ${lastBlock(index)} ${firstBlock(index)};
    ${isCorrespondingBlock && 'border: 1px solid white'};
    ${isCorrespondingBlock && theme.boxShadow}
  `
);
