import styled, { css, keyframes } from 'styled-components';

const shimmer = keyframes` 
    100% {
      transform: translateX(100%);
    }
`;

export const Loader = styled.div<{ height: number; width: number }>(
  ({ height, width }) => css`
    position: relative;
    height: ${height}px;
    width: ${width}px;
    background-color: #dddbdd;
    border-radius: 5px;
    overflow: hidden;

    &::after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);

      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.1) 20%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0.1) 80%,
        rgba(255, 255, 255, 0) 100%
      );

      animation: ${shimmer} 1.5s ease-in-out infinite;
      content: '';
    }
  `
);
