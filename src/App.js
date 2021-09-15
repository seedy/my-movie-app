import { DONE } from 'hooks/useFetch';

import objectToCamelCase from 'helpers/objectToCamelCase';
import compose from 'helpers/compose';
import prop from 'helpers/prop';
import isEmpty from 'helpers/isEmpty';

import { useFetchTMDBConfig } from 'hooks/useFetch/tmdb';
import { useCallback, useEffect, useMemo, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ImageListMoviesPopular from 'components/smart/ImageList/Movies/Popular';
import ImageListMoviesUpcoming from 'components/smart/ImageList/Movies/Upcoming';
import Typography from '@material-ui/core/Typography';
import ImageListSkeleton from 'components/dumb/ImageList/Skeleton';
import ImageListResponsive from 'components/dumb/ImageList/Responsive';
import MoviesContextProvider from 'components/smart/ImageList/Movies/Context';

import UpdateIcon from '@material-ui/icons/Update';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

// CONSTANTS
const ROW_HEIGHT = 300;
const BEST_SIZE = 'w185';
const FALLBACK_SIZE = 'original';

// HELPERS
const objectToCamelCaseImages = compose(
  objectToCamelCase,
  prop('images'),
);

// HOOKS
const useStyles = makeStyles(() => ({
  headerFlex: {
    display: 'flex',
  },
}));

// COMPONENTS
function App() {
  const classes = useStyles();

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
      const { baseUrl, posterSizes } = await configCallback();
      const hasBestSize = posterSizes.includes(BEST_SIZE);
      const posterSize = hasBestSize ? BEST_SIZE : FALLBACK_SIZE;
      setConfig({
        baseUrl,
        posterSize,
      });
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
      <Container maxWidth="md">
        <Box mb={4}>
          <Card>
            <CardHeader
              disableTypography
              classes={{ content: classes.headerFlex }}
              title={(
                <>
                  <Typography variant="h4">What&apos;s popular</Typography>
                  <Box ml={1}>
                    <Avatar>
                      <ThumbUpIcon color="primary" />
                    </Avatar>
                  </Box>
                </>
              )}
            />
            <CardContent>
              {configReady ? (
                <MoviesContextProvider>
                  <ImageListMoviesPopular rowHeight={ROW_HEIGHT} {...config} />
                </MoviesContextProvider>
              ) : (
                <ImageListResponsive rowHeight={ROW_HEIGHT} component={ImageListSkeleton} />
              )}
            </CardContent>
          </Card>
        </Box>

        <Card>
          <CardHeader
            disableTypography
            classes={{ content: classes.headerFlex }}
            title={(
              <>
                <Typography display="inline" variant="h4">Soon in theaters</Typography>
                <Box display="inline" ml={1}>
                  <Avatar>
                    <UpdateIcon color="primary" />
                  </Avatar>
                </Box>
              </>
              )}
          />
          <CardContent>
            {configReady ? (
              <MoviesContextProvider>
                <ImageListMoviesUpcoming rowHeight={ROW_HEIGHT} {...config} />
              </MoviesContextProvider>
            ) : (
              <ImageListResponsive rowHeight={ROW_HEIGHT} component={ImageListSkeleton} />
            )}

          </CardContent>
        </Card>
      </Container>

    </>
  );
}

export default App;
