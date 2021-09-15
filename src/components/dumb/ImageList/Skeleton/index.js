import PropTypes from 'prop-types';

import range from 'helpers/range';

import { useMemo } from 'react';

import ImageList from '@material-ui/core/ImageList';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

// COMPONENTS
const ImageListSkeleton = ({ component: Component, cols, rowHeight, ...props }) => {
  const rangeCols = useMemo(
    () => range(1, cols + 1),
    [cols],
  );
  return (
    <Component cols={cols} rowHeight={rowHeight} {...props}>
      {rangeCols.map((key) => (
        <Box key={key}>
          <Skeleton height={rowHeight} width="100%" />
        </Box>
      ))}
    </Component>
  );
};

ImageListSkeleton.propTypes = {
  component: PropTypes.elementType,
  cols: PropTypes.number,
  rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['auto'])]),
};

ImageListSkeleton.defaultProps = {
  component: ImageList,
  cols: 2,
  rowHeight: 180,
};

export default ImageListSkeleton;
