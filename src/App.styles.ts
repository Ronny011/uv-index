import styled, { css } from 'styled-components';
import { APP_HEIGHT, APP_WIDTH, theme } from 'utils/constants';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  width: 100%;
  gap: 15px;
`;

export const commonWrapper = () => css`
  background:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"),
    linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.12));
  background-size:
    128px 128px,
    100% 100%;
  border-radius: 20px;
  border: 1.5px solid ${theme.primary};
  box-shadow:
    0 8px 32px 0 rgba(0, 0, 0, 0.08),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
    0 0 12px 0 rgba(255, 233, 229, 0.15);
  backdrop-filter: blur(5px) saturate(1.4);
  -webkit-backdrop-filter: blur(5px) saturate(1.4);
`;

export const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  height: ${APP_HEIGHT}px;
  width: ${APP_WIDTH}px;

  ${commonWrapper}
`;
