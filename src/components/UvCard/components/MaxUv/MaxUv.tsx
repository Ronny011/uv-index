import { type FC } from 'react';
import { Body } from '../../UvCard.styles';
import { Chip } from './MaxUv.styles';
import { LOW_UV_CUTOFF } from '../../utils/constants';
import type { MaxUvObject } from 'types';

export const MaxUv: FC<{ maxUvObject: MaxUvObject | undefined }> = ({ maxUvObject }) => {
  const { maxUv, maxUvTime } = maxUvObject || {};

  return (
    <Body>
      Max UV today:
      <Chip $isLowUv={Number(maxUv) < LOW_UV_CUTOFF}>{String(parseFloat(Number(maxUv).toFixed(2)))}</Chip>
      at {maxUvTime}
    </Body>
  );
};
