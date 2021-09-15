import objectToCamelCaseMap from 'helpers/objectToCamelCase/map';

import { useFetchTMDBUpcoming } from 'hooks/useFetch/tmdb';
import { useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

// COMPONENTS
function App() {
  const [status, callback] = useFetchTMDBUpcoming(objectToCamelCaseMap);

  useEffect(
    () => {
      callback();
    },
    [callback],
  );

  return (
    <>
      <CssBaseline />
      {status}
    </>
  );
}

export default App;
