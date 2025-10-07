import { motion } from 'motion/react';
import styled from 'styled-components';

const GREEN_UV = 'linear-gradient(60deg, #56ab2f, #a8e063)';
const RED_UV = 'linear-gradient(60deg, #ed303c, #ff9c5b);';

export const Indicator = styled.div<{ $isLoading: boolean }>`
  margin: 45px;
  filter: ${({ $isLoading }) => ($isLoading ? 'none' : 'drop-shadow(0 0 15px rgba(0, 0, 0, 0.21))')};
`;

export const Flower = styled(motion.div)<{ $isLowUv: boolean }>`
  width: 200px;
  aspect-ratio: 1;
  background: ${({ $isLowUv }) => ($isLowUv ? GREEN_UV : RED_UV)};
  display: flex;
  align-items: center;
  justify-content: center;
  mask:
    var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g),
    var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g),
    var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g),
    var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g),
    var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g), var(--g),
    radial-gradient(100% 100%, #000 46.953%, #0000 calc(46.953% + 1px));
  mask-size:
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    5.908% 5.908%,
    100% 100%;
  mask-position:
    100% 50%,
    99.606% 56.267%,
    98.429% 62.434%,
    96.489% 68.406%,
    93.815% 74.088%,
    90.451% 79.389%,
    86.448% 84.227%,
    81.871% 88.526%,
    76.791% 92.216%,
    71.289% 95.241%,
    65.451% 97.553%,
    59.369% 99.114%,
    53.14% 99.901%,
    46.86% 99.901%,
    40.631% 99.114%,
    34.549% 97.553%,
    28.711% 95.241%,
    23.209% 92.216%,
    18.129% 88.526%,
    13.552% 84.227%,
    9.549% 79.389%,
    6.185% 74.088%,
    3.511% 68.406%,
    1.571% 62.434%,
    0.394% 56.267%,
    0% 50%,
    0.394% 43.733%,
    1.571% 37.566%,
    3.511% 31.594%,
    6.185% 25.912%,
    9.549% 20.611%,
    13.552% 15.773%,
    18.129% 11.474%,
    23.209% 7.784%,
    28.711% 4.759%,
    34.549% 2.447%,
    40.631% 0.886%,
    46.86% 0.099%,
    53.14% 0.099%,
    59.369% 0.886%,
    65.451% 2.447%,
    71.289% 4.759%,
    76.791% 7.784%,
    81.871% 11.474%,
    86.448% 15.773%,
    90.451% 20.611%,
    93.815% 25.912%,
    96.489% 31.594%,
    98.429% 37.566%,
    99.606% 43.733%,
    50% 50%;
`;

export const UvText = styled.span`
  font-size: 80px;
  font-weight: bold;
  color: white;
  z-index: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const Body = styled.span<{ $topMargin?: number }>`
  margin-top: ${({ $topMargin }) => $topMargin || 0}px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Chip = styled.div<{ $isLowUv: boolean }>`
  background: ${({ $isLowUv }) => ($isLowUv ? GREEN_UV : RED_UV)};
  color: white;
  padding: 5px;
  padding-inline: 10px;
  border-radius: 999px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;
