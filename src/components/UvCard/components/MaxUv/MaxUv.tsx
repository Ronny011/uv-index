import { type FC } from 'react';
import { Body } from '../../UvCard.styles';
import { Chip } from './MaxUv.styles';
import type { MaxUvObject } from 'types';

export const MaxUv: FC<{ maxUvObject: MaxUvObject | undefined }> = ({ maxUvObject }) => {
  const { maxUv, maxUvTime } = maxUvObject || {};

  return (
    <Body>
      Today's max
      <Chip $uv={Number(maxUv)}>{Number(maxUv).toFixed(1)}</Chip>
      at {maxUvTime}
    </Body>
  );
};
