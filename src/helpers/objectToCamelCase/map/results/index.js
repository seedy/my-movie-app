import compose from 'helpers/compose';
import prop from 'helpers/prop';
import objectToCamelCaseMap from 'helpers/objectToCamelCase/map';

export default compose(
  objectToCamelCaseMap,
  prop('results'),
);
