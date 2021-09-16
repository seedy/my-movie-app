import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import usePrefersDarkMode from 'hooks/usePrefersDarkMode';

// CONSTANTS
// Dark mode by default
const DEFAULT_DARK_MODE = true;

export const DarkModeContext = createContext({
  dark: DEFAULT_DARK_MODE,
  onSwitchMode: null,
});

// HOOKS
export const useDarkModeContext = () => useContext(DarkModeContext);

// COMPONENTS
const DarkModeContextProvider = ({ children, ...props }) => {
  const prefersDarkMode = usePrefersDarkMode();

  const prefersDarkModeOrDefault = useMemo(
    () => prefersDarkMode || DEFAULT_DARK_MODE,
    [prefersDarkMode],
  );

  const [dark, setDark] = useState(prefersDarkModeOrDefault);

  const onSwitchMode = useCallback(
    () => {
      setDark((prevDark) => !prevDark);
    },
    [setDark],
  );

  const value = useMemo(
    () => ({
      dark,
      onSwitchMode,
    }),
    [dark, onSwitchMode],
  );

  useEffect(
    () => {
      if (prefersDarkMode) {
        setDark(true);
      }
    },
    [prefersDarkMode, setDark],
  );

  return (
    <DarkModeContext.Provider value={value} {...props}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeContextProvider.propTypes = {
  children: PropTypes.node,
};

DarkModeContextProvider.defaultProps = {
  children: null,
};

export default DarkModeContextProvider;
