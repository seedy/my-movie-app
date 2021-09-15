import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import makeStyles from '@material-ui/core/styles/makeStyles';

import ImageListItem from '@material-ui/core/ImageListItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';

// HOOKS
const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      '& $item': {
        transform: 'rotateY(360deg)',
      },
      '& $backdrop': {
        height: '100%',
      },
      '& $content': {
        opacity: 1,
        transition: `opacity ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeIn} 0.4s`,
      },
    },
  },
  item: {
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
    transition: `opacity ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeIn}`,
    opacity: 0,
  },
}));

// COMPONENTS
const ImageListItemHoverFlip = forwardRef(({
  alt, src,
  back,
  classes,
  ...props
}, ref) => {
  const internalClasses = useStyles();

  return (
    <ImageListItem
      ref={ref}
      component={ButtonBase}
      classes={{
        root: internalClasses.root,
        item: internalClasses.item,
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
        <Box className={clsx(internalClasses.content, classes.content)}>
          {back}
        </Box>
      </Backdrop>
    </ImageListItem>
  );
});

ImageListItemHoverFlip.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  back: PropTypes.node,
  classes: PropTypes.shape({
    content: PropTypes.string,
  }),
};

ImageListItemHoverFlip.defaultProps = {
  back: null,
  classes: {
    content: '',
  },
};

export default ImageListItemHoverFlip;
