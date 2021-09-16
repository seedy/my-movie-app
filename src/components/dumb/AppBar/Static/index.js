import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';

// COMPONENTS
const AppBarStatic = (props) => <AppBar {...props} />;

AppBarStatic.propTypes = {
  position: PropTypes.string,
};

AppBarStatic.defaultProps = {
  position: 'static',
};

export default AppBarStatic;
