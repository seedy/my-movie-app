import { forwardRef } from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@material-ui/core/styles/makeStyles';

import ImageListItem from '@material-ui/core/ImageListItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';

// HOOKS
const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      '& $image': {
        transform: 'rotateY(360deg)',
      },
      '& $backdrop': {
        height: '100%',
      },
      '& $content': {
        opacity: 1,
      },
    },
  },
  image: {
    perspective: '10px',
    transition: 'transform 1s',
    transformStyle: 'preserve-3d',
  },
  backdrop: {
    position: 'absolute',
    zIndex: 'auto',
    color: theme.palette.common.white,
    transition: `height ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeIn} 0.4s !important`,
    height: 0,
    bottom: 0,
    top: 'auto',
  },
  content: {
    padding: theme.spacing(1),
    display: 'flex',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
}));

// COMPONENTS
const ImageListItemFlippable = forwardRef(({
  alt, src,
  back,
  ...props
}, ref) => {
  const internalClasses = useStyles();

  return (
    <ImageListItem
      ref={ref}
      component={ButtonBase}
      classes={{
        root: internalClasses.root,
        item: internalClasses.image,
      }}
      {...props}
    >
      <img
        ref={ref}
        alt={alt}
        src={src}
      />
      <Backdrop
        open
        classes={{
          root: internalClasses.backdrop,
        }}
      >
        <Box className={internalClasses.content}>
          {back}
        </Box>
      </Backdrop>
    </ImageListItem>
  );
});

ImageListItemFlippable.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  back: PropTypes.node,
};

ImageListItemFlippable.defaultProps = {
  back: null,
};

export default ImageListItemFlippable;
