import { type FC } from 'react';
import { Loader } from './Skeleton.styles';

interface Props {
  height: number;
  width: number;
}

export const Skeleton: FC<Props> = ({ height, width }) => {
  return (
    <Loader
      height={height}
      width={width}
    />
  );
};
