import useIsXs from 'hooks/useIsXs';
import useIsDownSm from 'hooks/useIsDownSm';
import { useMemo } from 'react';

export default () => {
  const isXs = useIsXs();
  const isDownSm = useIsDownSm();

  const cols = useMemo(
    () => {
      if (isXs) {
        return 2;
      }
      if (isDownSm) {
        return 3;
      }
      return 4;
    },
    [isXs, isDownSm],
  );

  return cols;
};
