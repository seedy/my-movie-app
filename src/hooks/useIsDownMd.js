import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default () => {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('md'));
  return isDownSm;
};
