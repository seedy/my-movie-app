import mapKeys from 'helpers/mapKeys';
import camelCase from 'helpers/camelCase';

export default (obj) => mapKeys(obj, (v, k) => camelCase(k));
