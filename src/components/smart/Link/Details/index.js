import PropTypes from 'prop-types';

import routes from 'routes';

import { useMemo } from 'react';

import { Link, generatePath } from 'react-router-dom';

// COMPONENTS
const LinkDetails = ({ id, ...props }) => {
  const to = useMemo(
    () => generatePath(routes.details, {
      id,
    }),
    [id],
  );

  return <Link to={to} {...props} />;
};

LinkDetails.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default LinkDetails;
