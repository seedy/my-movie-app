import { createTheme, responsiveFontSizes } from '@material-ui/core';
import orange from '@material-ui/core/colors/orange';

// CONSTANTS
const DEFAULT_THEME = 'dark';

// HELPERS
export const getTheme = (type) => responsiveFontSizes(createTheme({
  palette: {
    type,
    primary: orange,
  },
}));

export default getTheme(DEFAULT_THEME);
