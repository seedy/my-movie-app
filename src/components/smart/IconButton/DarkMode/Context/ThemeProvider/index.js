import THEME, { getTheme } from 'theme';
import isNil from 'helpers/isNil';

import { useDarkModeContext } from 'components/smart/IconButton/DarkMode/Context';
import { useMemo } from 'react';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core';

// COMPONENTS
const ThemeProvider = (props) => {
  const { dark } = useDarkModeContext();

  const mode = useMemo(
    () => {
      if (isNil(dark)) {
        return null;
      }
      return dark ? 'dark' : 'light';
    },
    [dark],
  );

  const theme = useMemo(
    () => (isNil(mode) ? THEME : getTheme(mode)),
    [mode],
  );

  return <MuiThemeProvider theme={theme} {...props} />;
};

export default ThemeProvider;
