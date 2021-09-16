import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

// CONTEXT
export const MoviesContext = createContext({
  popular: null,
  upcoming: null,
  onPopular: null,
  onUpcoming: null,
});

// HOOKS
export const useMoviesContext = () => useContext(MoviesContext);

// COMPONENTS
const MoviesContextProvider = ({ children, ...props }) => {
  const [popular, setPopular] = useState(null);
  const [upcoming, setUpcoming] = useState(null);

  const onPopular = useCallback(
    (next) => setPopular(next),
    [setPopular],
  );

  const onUpcoming = useCallback(
    (next) => setUpcoming(next),
    [setUpcoming],
  );

  const value = useMemo(
    () => ({
      popular,
      upcoming,
      onPopular,
      onUpcoming,
    }),
    [popular, upcoming, onPopular, onUpcoming],
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
