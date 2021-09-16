import PropTypes from 'prop-types';

import { MAX, PRECISION } from 'constants/rating';

import isEmpty from 'helpers/isEmpty';
import isNil from 'helpers/isNil';

import { useEffect, useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ImageListResponsive from 'components/dumb/ImageList/Responsive';
import ImageListSkeleton from 'components/dumb/ImageList/Skeleton';
import Typography from '@material-ui/core/Typography';
import ImageListItemHoverFlip from 'components/dumb/ImageListItem/HoverFlip';
import Rating from '@material-ui/lab/Rating';
import LinkDetails from 'components/smart/Link/Details';

// HOOKS
const useStyles = makeStyles(() => ({
  itemContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    width: '100%',
  },
}));

// COMPONENTS
const ImageListMovies = ({
  ready, get, movies, placeholder, baseUrl, posterSize, ...props
}) => {
  const classes = useStyles();

  const hasMovies = useMemo(
    () => !isNil(movies) && !isEmpty(movies),
    [movies],
  );

  useEffect(
    () => {
      if (isNil(movies)) {
        get();
      }
    },
    [get, movies],
  );

  if (!ready) {
    return <ImageListResponsive component={ImageListSkeleton} {...props} />;
  }

  if (!hasMovies) {
    return (
      <Typography variant="subtitle1" color="textPrimary">{placeholder}</Typography>
    );
  }

  return (
    <ImageListResponsive {...props}>
      {movies.map(({ id, posterPath, title, voteAverage }) => (
        <ImageListItemHoverFlip
          classes={{
            content: classes.itemContent,
          }}
          id={id}
          component={LinkDetails}
          key={id}
          alt={title}
          src={`${baseUrl}${posterSize}${posterPath}`}
          back={(
            <>
              <Typography variant="caption">{title}</Typography>
              <Rating name="score" value={voteAverage} max={MAX} precision={PRECISION} readOnly />
            </>
          )}
        />
      ))}
    </ImageListResponsive>
  );
};

ImageListMovies.propTypes = {
  ready: PropTypes.bool,
  get: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    posterPath: PropTypes.string,
    title: PropTypes.string,
    voteAverage: PropTypes.number,
  })),
  baseUrl: PropTypes.string.isRequired,
  posterSize: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

ImageListMovies.defaultProps = {
  ready: false,
  movies: undefined,
};

export default ImageListMovies;
