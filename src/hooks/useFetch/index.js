import identity from 'helpers/identity';

import { useCallback, useMemo, useState } from 'react';

// CONSTANTS
export const LOADING = Symbol('LOADING');
export const DONE = Symbol('DONE');


// HOOKS
export default (transformFn = identity) => {
  const [status, setStatus] = useState();

  const onLoad = useCallback(
    () => {
      setStatus(LOADING);
    },
    [setStatus],
  );

  const onDone = useCallback(
    () => {
      setStatus(DONE);
    },
    [setStatus],
  );

  const callback = useCallback(
    async (resource, options) => {
      onLoad();
      const response = await fetch(resource, options);
      onDone();
      const json = await response.json();
      return transformFn(json);
    },
    [onLoad, onDone, transformFn],
  );

  return useMemo(
    () => [status, callback],
    [status, callback],
  );
};
