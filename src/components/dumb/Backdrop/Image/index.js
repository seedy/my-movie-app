import PropTypes from 'prop-types';
import clsx from 'clsx';

import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';

// HOOKS
const useStyles = makeStyles((theme) => ({
  backgroundLoading: {
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
  },
  backgroundLoaded: {
    opacity: 1,
  },
  backgroundImage: ({ src }) => ({
    background: `url(${src})`,
    transition: 'opacity 300ms',
    position: 'relative',
    zIndex: 1,
    borderRadius: theme.shape.borderRadius,
  }),
  backdrop: {
    backgroundColor: theme.palette.common.black,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
    borderRadius: theme.shape.borderRadius,
  },
  content: {
    color: theme.palette.common.white,
  },
}));

// COMPONENTS
const BackdropImage = ({ children, enter, src, ...props }) => {
  const classes = useStyles({ src });

  return (
    <Box
      className={clsx(classes.backgroundImage, {
        [classes.backgroundLoading]: !enter,
        [classes.backgroundLoaded]: enter,
      })}
      {...props}
    >
      <Box className={classes.backdrop} />
      <Box className={classes.content}>
        {children}
      </Box>
    </Box>
  );
};

BackdropImage.propTypes = {
  enter: PropTypes.bool,
  children: PropTypes.node,
  src: PropTypes.string,
};

BackdropImage.defaultProps = {
  enter: false,
  children: null,
  src: null,
};

export default BackdropImage;
