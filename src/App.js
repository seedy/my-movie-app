import { DONE } from 'hooks/useFetch';
import routes from 'routes';

import objectToCamelCase from 'helpers/objectToCamelCase';
import compose from 'helpers/compose';
import prop from 'helpers/prop';
import isEmpty from 'helpers/isEmpty';

import { useFetchTMDBConfig } from 'hooks/useFetch/tmdb';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Route, BrowserRouter } from 'react-router-dom';
import DetailsScreen from 'screens/Details';
import ListsScreen from 'screens/Lists';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import MoviesContextProvider from 'components/smart/ImageList/Movies/Context';

// HELPERS
const objectToCamelCaseImages = compose(
  objectToCamelCase,
  prop('images'),
);


// COMPONENTS
function App() {
  const [config, setConfig] = useState();
  const [configStatus, configCallback] = useFetchTMDBConfig(objectToCamelCaseImages);

  const configDone = useMemo(
    () => configStatus === DONE,
    [configStatus],
  );

  const configReady = useMemo(
    () => configDone && !isEmpty(config),
    [configDone, config],
  );

  const getConfig = useCallback(
    async () => {
      const value = await configCallback();
      setConfig(value);
    },
    [configCallback, setConfig],
  );
  useEffect(
    () => {
      getConfig();
    },
    [getConfig],
  );

  return (
    <>
      <CssBaseline />
      <Container component={Box} my={3}>
        <BrowserRouter>
          <MoviesContextProvider>
            <Route path={routes.details} exact>
              <DetailsScreen config={config} configReady={configReady} />
            </Route>
            <Route>
              <ListsScreen config={config} configReady={configReady} />
            </Route>
          </MoviesContextProvider>
        </BrowserRouter>
      </Container>

    </>
  );
}

export default App;
