import { useMemo } from 'react';

import { PropTypes } from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';

// CONSTANTS
const DARK_TITLE = 'Toggle light mode';
const LIGHT_TITLE = 'Toggle dark mode';

// COMPONENTS
const TooltipDarkMode = ({ dark, ...props }) => {
  const title = useMemo(
    () => (dark ? DARK_TITLE : LIGHT_TITLE),
    [dark],
  );

  return (
    <Tooltip title={title} {...props} />
  );
};

TooltipDarkMode.propTypes = {
  dark: PropTypes.bool,
};

TooltipDarkMode.defaultProps = {
  dark: false,
};

export default TooltipDarkMode;
