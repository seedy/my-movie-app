import PropTypes from 'prop-types';

import { useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ExplicitIcon from '@material-ui/icons/Explicit';

// HOOKS
const useStyles = makeStyles((theme) => ({
  titleBold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

// COMPONENTS
const BoxDetails = ({
  title, tagline, genres, overview, releaseDate, adult, budget, revenue, ...props
}) => {
  const classes = useStyles();

  const genresText = useMemo(
    () => genres.join(', '),
    [genres],
  );

  return (
    <Box {...props}>
      <Typography
        variant="h3"
        paragraph
        className={classes.titleBold}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        paragraph
        className={classes.titleBold}
      >
        {tagline}

      </Typography>
      <Typography variant="body1" paragraph>
        {overview}
      </Typography>
      <Typography gutterBottom>
        <span className={classes.titleBold}>Genre: </span>
        {genresText}
      </Typography>
      <Typography gutterBottom>
        <span className={classes.titleBold}>Release: </span>
        {releaseDate}
      </Typography>
      <Typography gutterBottom>
        <span className={classes.titleBold}>Budget / Revenue: </span>
        $
        {budget}
        {' / '}
        $
        {revenue}
      </Typography>
      {adult && <ExplicitIcon />}
    </Box>
  );
};

BoxDetails.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  revenue: PropTypes.number.isRequired,
  adult: PropTypes.bool.isRequired,
};

export default BoxDetails;
