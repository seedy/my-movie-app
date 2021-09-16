import { forwardRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import isFunction from 'helpers/isFunction';

import IconButton from '@material-ui/core/IconButton';
import TooltipDarkMode from 'components/dumb/Tooltip/DarkMode';

import DarkIcon from '@material-ui/icons/Brightness3';
import LightIcon from '@material-ui/icons/Brightness5';


// COMPONENTS
const IconButtonDarkMode = forwardRef(({ dark, onSwitchMode, onClick, ...props }, ref) => {
  const handleClick = useCallback(
    (e) => {
      if (isFunction(onSwitchMode)) {
        onSwitchMode(e);
      }
      if (isFunction(onClick)) {
        onClick(e);
      }
    },
    [onSwitchMode, onClick],
  );

  return (
    <TooltipDarkMode dark={dark}>
      <IconButton ref={ref} onClick={handleClick} {...props}>
        {dark ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </TooltipDarkMode>
  );
});

IconButtonDarkMode.propTypes = {
  dark: PropTypes.bool,
  onSwitchMode: PropTypes.func,
  onClick: PropTypes.func,
};

IconButtonDarkMode.defaultProps = {
  dark: false,
  onSwitchMode: null,
  onClick: null,
};

export default IconButtonDarkMode;
