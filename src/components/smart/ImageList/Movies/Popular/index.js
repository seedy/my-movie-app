import PropTypes from 'prop-types';


import objectToCamelCaseMapResults from 'helpers/objectToCamelCase/map/results';

import { useFetchTMDBPopular } from 'hooks/useFetch/tmdb';

import ImageListMovies from 'components/smart/ImageList/Movies';

// COMPONENTS
const ImageListMoviesPopular = (props) => {
  const [status, callback] = useFetchTMDBPopular(objectToCamelCaseMapResults);


  return (
    <ImageListMovies
      status={status}
      callback={callback}
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
