import useMediaQuery from '@material-ui/core/useMediaQuery';

export default () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return prefersDarkMode;
};
