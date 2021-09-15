import PropTypes from 'prop-types';

import useResponsiveCols from 'hooks/useResponsiveCols';

import ImageList from '@material-ui/core/ImageList';

// COMPONENTS
const ImageListResponsive = ({ component: Component, cols, ...props }) => {
  const responsiveCols = useResponsiveCols();

  return (
    <Component cols={responsiveCols} {...props} />
  );
};

ImageListResponsive.propTypes = {
  component: PropTypes.elementType,
  cols: PropTypes.number,
};

ImageListResponsive.defaultProps = {
  component: ImageList,
  cols: 2,
};

export default ImageListResponsive;
