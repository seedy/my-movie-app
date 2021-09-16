import PropTypes from 'prop-types';

import routes from 'routes';
import { POSTER_BEST_SIZE, POSTER_FALLBACK_SIZE, BACKDROP_BEST_SIZE, BACKDROP_FALLBACK_SIZE } from 'constants/sizes';
import { DONE } from 'hooks/useFetch';

import objectToCamelCase from 'helpers/objectToCamelCase';
import prop from 'helpers/prop';
import isNil from 'helpers/isNil';

import useIsXs from 'hooks/useIsXs';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { useFetchTMDBDetail } from 'hooks/useFetch/tmdb';

import { Link, useParams, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import RatingImage from 'components/dumb/Rating/Image';
import IconButton from '@material-ui/core/IconButton';
import BoxDetails from 'components/dumb/Box/Details';
import Dialog from '@material-ui/core/Dialog';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import BackdropImage from 'components/dumb/Backdrop/Image';

// CONSTANTS
const EMPTY_OBJ = {};

// HELPERS
const nameProp = prop('name');

// COMPONENTS
const DetailsScreen = ({ config, configReady }) => {
  const [status, callback] = useFetchTMDBDetail(objectToCamelCase);
  const [details, setDetails] = useState();

  const detailReady = useMemo(
    () => configReady && status === DONE && !isNil(details),
    [configReady, status, details],
  );

  const { id } = useParams();
  const { push } = useHistory();
  const isXs = useIsXs();

  const {
    backdropPath,
    title, adult, budget, genres, overview, releaseDate, tagline,
    posterPath, voteAverage, voteCount,
  } = useMemo(
    () => details || EMPTY_OBJ,
    [details],
  );

  const backdropSrc = useMemo(
    () => {
      const { baseUrl, backdropSizes } = config || {};
      const hasBestSize = backdropSizes?.includes(BACKDROP_BEST_SIZE);
      const backdropSize = hasBestSize ? BACKDROP_BEST_SIZE : BACKDROP_FALLBACK_SIZE;
      return `${baseUrl}${backdropSize}${backdropPath}`;
    },
    [config, backdropPath],
  );

  const genreNames = useMemo(
    () => (genres || []).map(nameProp),
    [genres],
  );

  const posterSrc = useMemo(
    () => {
      const { baseUrl, posterSizes } = config || {};
      const hasBestSize = posterSizes?.includes(POSTER_BEST_SIZE);
      const posterSize = hasBestSize ? POSTER_BEST_SIZE : POSTER_FALLBACK_SIZE;
      return `${baseUrl}${posterSize}${posterPath}`;
    },
    [config, posterPath],
  );

  const onDetails = useCallback(
    (data) => {
      setDetails(data);
    },
    [setDetails],
  );

  const get = useCallback(
    async () => {
      const result = await callback(id);
      onDetails(result);
    },
    [callback, onDetails, id],
  );

  const onClose = useCallback(
    () => {
      push(routes._);
    },
    [push],
  );

  useEffect(
    () => {
      get();
    },
    [get],
  );

  return (
    <Dialog open maxWidth={false} onClose={onClose} fullScreen={isXs}>
      <BackdropImage
        p={2}
        enter={detailReady}
        src={backdropSrc}
        height="100%"
      >
        <Box mt={-2}>
          <IconButton color="inherit" edge="start" component={Link} to={routes._}>
            <ArrowBackIcon />
          </IconButton>
        </Box>
        {detailReady && (
        <Box display="flex" flexDirection={isXs ? 'column' : 'row'}>
          <RatingImage
            src={posterSrc}
            title={title}
            value={voteAverage}
            count={voteCount}
          />
          <BoxDetails
            title={title}
            tagline={tagline}
            genres={genreNames}
            overview={overview}
            releaseDate={releaseDate}
            adult={adult}
            budget={budget}
            ml={isXs ? 0 : 4}
          />
        </Box>
        )}
      </BackdropImage>
    </Dialog>
  );
};

DetailsScreen.propTypes = {
  config: PropTypes.shape({
    baseUrl: PropTypes.string,
    posterSizes: PropTypes.arrayOf(PropTypes.string),
  }),
  configReady: PropTypes.bool.isRequired,
};

DetailsScreen.defaultProps = {
  config: {},
};

export default DetailsScreen;
