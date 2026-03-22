import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { theme, AQI_LEVEL_COLORS } from 'utils/constants';

export const firstBlock = (index: number, isActiveBlock: boolean) =>
  index === 0 ? theme.borderRadius : isActiveBlock ? '5px' : 0;
export const lastBlock = (index: number, isActiveBlock: boolean) =>
  index === 5 ? theme.borderRadius : isActiveBlock ? '5px' : 0;

export const Scale = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 240px;
  height: 20px;
  border-radius: ${theme.borderRadius};
`;

export const LevelBlock = styled(motion.div)<{ color: string; index: number; $isActiveBlock: boolean }>(
  ({ color, index, $isActiveBlock }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${$isActiveBlock ? AQI_LEVEL_COLORS[index] : color};
    color: white;
    border-radius: ${firstBlock(index, $isActiveBlock)} ${lastBlock(index, $isActiveBlock)}
      ${lastBlock(index, $isActiveBlock)} ${firstBlock(index, $isActiveBlock)};
  `
);
