import { DONE } from 'hooks/useFetch';

import objectToCamelCaseMap from 'helpers/objectToCamelCase/map';

import { useFetchTMDBUpcoming, useFetchTMDBPopular } from 'hooks/useFetch/tmdb';
import { useCallback, useEffect, useMemo } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';

import CheckIcon from '@material-ui/icons/Check';

// COMPONENTS
function App() {
  const [upcomingStatus, upcomingCallback] = useFetchTMDBUpcoming(objectToCamelCaseMap);
  const [popularStatus, popularCallback] = useFetchTMDBPopular(objectToCamelCaseMap);

  const upcomingDone = useMemo(
    () => upcomingStatus === DONE,
    [upcomingStatus],
  );

  const popularDone = useMemo(
    () => popularStatus === DONE,
    [popularStatus],
  );

  const allMoviesDone = useMemo(
    () => upcomingDone && popularDone,
    [upcomingDone, popularDone],
  );

  const allMoviesCallback = useCallback(
    () => Promise.allSettled([
      upcomingCallback(),
      popularCallback(),
    ]),
    [upcomingCallback, popularCallback],
  );

  useEffect(
    () => {
      allMoviesCallback();
    },
    [allMoviesCallback],
  );

  return (
    <>
      <CssBaseline />
      {allMoviesDone ? (
        <IconButton>
          <CheckIcon />
        </IconButton>
      ) : (
        <CircularProgress />
      )}
    </>
  );
}

export default App;
