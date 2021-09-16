import PropTypes from 'prop-types';

import { DONE } from 'hooks/useFetch';

import objectToCamelCaseMapResults from 'helpers/objectToCamelCase/map/results';
import isNil from 'helpers/isNil';

import { useFetchTMDBUpcoming } from 'hooks/useFetch/tmdb';
import { useMoviesContext } from 'components/smart/ImageList/Movies/Context';
import { useCallback, useMemo } from 'react';

import ImageListMovies from 'components/smart/ImageList/Movies';

// COMPONENTS
const ImageListMoviesUpcoming = (props) => {
  const [status, callback] = useFetchTMDBUpcoming(objectToCamelCaseMapResults);

  const { upcoming, onUpcoming } = useMoviesContext();

  const ready = useMemo(
    () => status === DONE || !isNil(upcoming),
    [status, upcoming],
  );

  const get = useCallback(
    async () => {
      const result = await callback();
      onUpcoming(result);
    },
    [callback, onUpcoming],
  );


  return (
    <ImageListMovies
      ready={ready}
      get={get}
      movies={upcoming}
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
