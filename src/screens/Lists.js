import PropTypes from 'prop-types';

import { POSTER_BEST_SIZE, POSTER_FALLBACK_SIZE, ROW_HEIGHT } from 'constants/sizes';

import { useMemo } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

import WatchLaterIcon from '@material-ui/icons/WatchLater';
import WhatshotIcon from '@material-ui/icons/Whatshot';

// HOOKS
const useStyles = makeStyles((theme) => ({
  headerFlexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  titleBold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

// COMPONENTS
const ListsScreen = ({ config, configReady }) => {
  const classes = useStyles();

  const listConfig = useMemo(
    () => {
      const { baseUrl, posterSizes } = config || {};
      const hasBestSize = posterSizes?.includes(POSTER_BEST_SIZE);
      const posterSize = hasBestSize ? POSTER_BEST_SIZE : POSTER_FALLBACK_SIZE;
      return { posterSize, baseUrl };
    },
    [config],
  );

  return (
    <>
      <Box mb={4}>
        <Card>
          <CardHeader
            disableTypography
            classes={{ content: classes.headerFlexCenter }}
            title={(
              <>
                <Typography className={classes.titleBold} variant="h3">What&apos;s popular</Typography>
                <Box ml={1}>
                  <Avatar>
                    <WhatshotIcon color="primary" />
                  </Avatar>
                </Box>
              </>
              )}
          />
          <CardContent>
            {configReady ? (
              <ImageListMoviesPopular rowHeight={ROW_HEIGHT} {...listConfig} />
            ) : (
              <ImageListResponsive rowHeight={ROW_HEIGHT} component={ImageListSkeleton} />
            )}
          </CardContent>
        </Card>
      </Box>

      <Card>
        <CardHeader
          disableTypography
          classes={{ content: classes.headerFlexCenter }}
          title={(
            <>
              <Typography variant="h3" className={classes.titleBold}>Soon in theaters</Typography>
              <Box ml={1}>
                <Avatar>
                  <WatchLaterIcon color="primary" />
                </Avatar>
              </Box>
            </>
              )}
        />
        <CardContent>
          {configReady ? (
            <ImageListMoviesUpcoming rowHeight={ROW_HEIGHT} {...listConfig} />
          ) : (
            <ImageListResponsive rowHeight={ROW_HEIGHT} component={ImageListSkeleton} />
          )}

        </CardContent>
      </Card>
    </>
  );
};

ListsScreen.propTypes = {
  config: PropTypes.shape({
    baseUrl: PropTypes.string,
    posterSizes: PropTypes.arrayOf(PropTypes.string),
  }),
  configReady: PropTypes.bool.isRequired,
};

ListsScreen.defaultProps = {
  config: {},
};

export default ListsScreen;
