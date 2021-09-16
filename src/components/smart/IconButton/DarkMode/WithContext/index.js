import IconButtonDarkMode from 'components/smart/IconButton/DarkMode';
import { useDarkModeContext } from 'components/smart/IconButton/DarkMode/Context';

const IconButtonDarkModeWithContext = (props) => {
  const context = useDarkModeContext();

  return <IconButtonDarkMode {...context} {...props} />;
};

export default IconButtonDarkModeWithContext;
