import { type FC } from 'react';
import { Loader } from './Skeleton.styles';

interface Props {
  height: number;
  width: number;
  isRound?: boolean;
  margin?: string;
}

export const Skeleton: FC<Props> = ({ height, width, isRound = false, margin = '0' }) => {
  return (
    <Loader
      height={height}
      width={width}
      $isRound={isRound}
      $margin={margin}
    />
  );
};
