import PropTypes from 'prop-types';

import { DONE } from 'hooks/useFetch';

import objectToCamelCaseMapResults from 'helpers/objectToCamelCase/map/results';
import isNil from 'helpers/isNil';

import { useFetchTMDBPopular } from 'hooks/useFetch/tmdb';
import { useMoviesContext } from 'components/smart/ImageList/Movies/Context';
import { useCallback, useMemo } from 'react';

import ImageListMovies from 'components/smart/ImageList/Movies';

// COMPONENTS
const ImageListMoviesPopular = (props) => {
  const [status, callback] = useFetchTMDBPopular(objectToCamelCaseMapResults);

  const { popular, onPopular } = useMoviesContext();

  const ready = useMemo(
    () => status === DONE || !isNil(popular),
    [status, popular],
  );


  const get = useCallback(
    async () => {
      const result = await callback();
      onPopular(result);
    },
    [callback, onPopular],
  );

  return (
    <ImageListMovies
      ready={ready}
      get={get}
      movies={popular}
      placeholder="No popular movie found"
      {...props}
    />
  );
};

ImageListMoviesPopular.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  posterSize: PropTypes.string.isRequired,
};

export default ImageListMoviesPopular;
