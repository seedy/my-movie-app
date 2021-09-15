import useIsXs from 'hooks/useIsXs';
import useIsDownSm from 'hooks/useIsDownSm';
import useIsDownMd from 'hooks/useIsDownMd';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useMemo } from 'react';

export default () => {
  const isXs = useIsXs();
  const isDownSm = useIsDownSm();
  const isDownMd = useIsDownMd();

  const isUpLargeSm = useMediaQuery('(min-width: 780px) and (max-width: 960px)');

  const cols = useMemo(
    () => {
      if (isXs) {
        return 2;
      }
      if (isUpLargeSm) {
        return 4;
      }
      if (isDownSm) {
        return 3;
      }
      if (isDownMd) {
        return 5;
      }
      return 6;
    },
    [isXs, isDownSm, isUpLargeSm, isDownMd],
  );

  return cols;
};
