import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { theme } from 'utils/constants';

export const firstBlock = (index: number) => (index === 0 ? theme.borderRadius : 0);
export const lastBlock = (index: number) => (index === 5 ? theme.borderRadius : 0);

export const airQualityLevelStrongColors = [
  '#00C800', // Good (0-50) - slightly muted green
  '#E6E600', // Moderate (51-100) - slightly muted yellow
  '#E67300', // Unhealthy for Sensitive Groups (101-150) - slightly muted orange
  '#E60000', // Unhealthy (151-200) - slightly muted red
  '#7D3585', // Very Unhealthy (201-300) - slightly muted purple
  '#6B001F' // Hazardous (301+) - slightly muted maroon
];

export const airQualityLevelMutedColors = ['#6BAF6B', '#D4D46B', '#D4956B', '#D46B6B', '#9B6B9B', '#7A4A5A'];

export const Scale = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 240px;
  height: 20px;
  border-radius: ${theme.borderRadius};
`;

export const LevelBlock = styled(motion.div)<{ color: string; index: number; isCorrespondingBlock: boolean }>(
  ({ color, index, isCorrespondingBlock }) => css`
    background-color: ${isCorrespondingBlock ? airQualityLevelStrongColors[index] : color};
    color: white;
    text-align: center;
    border-radius: ${firstBlock(index)} ${lastBlock(index)} ${lastBlock(index)} ${firstBlock(index)};
    ${isCorrespondingBlock && theme.boxShadow}
  `
);
