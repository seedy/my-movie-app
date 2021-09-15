import PropTypes from 'prop-types';

import { ROW_HEIGHT, FIXED_WIDTH } from 'constants/sizes';
import { MAX, PRECISION, FACTOR } from 'constants/rating';

import { useCallback, useMemo, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

// HOOKS
const useStyles = makeStyles((theme) => ({
  titleBold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

// COMPONENTS
const RatingImage = ({ src, title, value, count }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const rating = useMemo(
    () => value * FACTOR,
    [value],
  );

  const onVote = useCallback(
    () => {
      setOpen(true);
    },
    [setOpen],
  );

  const onClose = useCallback(
    () => {
      setOpen(false);
    },
    [setOpen],
  );

  return (
    <Box display="flex" flexDirection="column">
      <img
        alt={title}
        src={src}
        height={ROW_HEIGHT}
        width={FIXED_WIDTH}
      />
      <Box display="flex" flexDirection="row" flexGrow={1} alignItems="center">
        <Rating name="score" value={rating} precision={PRECISION} max={MAX} onChange={onVote} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="caption">
            {value}
            {' / '}
            {MAX / FACTOR}
          </Typography>
          <Typography variant="caption">
            (
            {count}
            {' '}
            votes)
          </Typography>
        </Box>
      </Box>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Login to rate
          {' '}
          <span className={classes.titleBold}>{title}</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Only authenticated users can rate a movie. Please register or log in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>Got it</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

RatingImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default RatingImage;
