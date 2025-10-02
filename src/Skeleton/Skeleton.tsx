import { type FC } from 'react';
import { Loader } from './Skeleton.styles';

interface Props {
  height: number;
  width: number;
  isRound?: boolean;
}

export const Skeleton: FC<Props> = ({ height, width, isRound = false }) => {
  return (
    <Loader
      height={height}
      width={width}
      $isRound={isRound}
    />
  );
};
