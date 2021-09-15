import PropTypes from 'prop-types';

import objectToCamelCaseMapResults from 'helpers/objectToCamelCase/map/results';

import { useFetchTMDBUpcoming } from 'hooks/useFetch/tmdb';

import ImageListMovies from 'components/smart/ImageList/Movies';

// COMPONENTS
const ImageListMoviesUpcoming = (props) => {
  const [status, callback] = useFetchTMDBUpcoming(objectToCamelCaseMapResults);

  return (
    <ImageListMovies
      status={status}
      callback={callback}
      placeholder="No upcoming movie found"
      {...props}
    />
  );
};

ImageListMoviesUpcoming.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  posterSize: PropTypes.string.isRequired,
};

export default ImageListMoviesUpcoming;
