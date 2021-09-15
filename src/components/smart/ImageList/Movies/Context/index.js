import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// CONTEXT
export const MoviesContext = createContext({
  movies: null,
  onReceive: null,
});

// HOOKS
export const useMoviesContext = () => useContext(MoviesContext);

// COMPONENTS
const MoviesContextProvider = ({ children, ...props }) => {
  const [movies, setMovies] = useState(null);

  const onReceive = useCallback(
    (next) => setMovies(next),
    [setMovies],
  );

  const value = useMemo(
    () => ({
      movies,
      onReceive,
    }),
    [movies, onReceive],
  );

  return (
    <MoviesContext.Provider {...props} value={value}>
      {children}
    </MoviesContext.Provider>
  );
};

MoviesContextProvider.propTypes = {
  children: PropTypes.node,
};

MoviesContextProvider.defaultProps = {
  children: null,
};

export default MoviesContextProvider;
