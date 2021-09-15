import { API_KEY, BASE_URL } from 'secrets';

import identity from 'helpers/identity';
import isEmpty from 'helpers/isEmpty';

import useFetch from 'hooks/useFetch';
import { useCallback, useMemo } from 'react';

// CONSTANTS
const POPULAR = `${BASE_URL}/movie/popular`;
const UPCOMING = `${BASE_URL}/movie/upcoming`;
const DETAIL = `${BASE_URL}/movie/`;

const DEFAULT_QUERY = {};

// HOOKS
export const useFetchTMDBPopular = (transformFn = identity) => {
  const [status, callback] = useFetch(transformFn);

  const wrappedCallback = useCallback(
    (query = DEFAULT_QUERY) => {
      const url = new URL(POPULAR);
      if (!isEmpty(query)) {
        url.search = new URLSearchParams(query).toString();
      }
      return callback(url, {
        METHOD: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${API_KEY}`,
        }),
      });
    },
    [callback],
  );

  return useMemo(
    () => [status, wrappedCallback],
    [status, wrappedCallback],
  );
};

export const useFetchTMDBUpcoming = (transformFn = identity) => {
  const [status, callback] = useFetch(transformFn);

  const wrappedCallback = useCallback(
    (query = DEFAULT_QUERY) => {
      const url = new URL(UPCOMING);
      if (!isEmpty(query)) {
        url.search = new URLSearchParams(query).toString();
      }
      return callback(url, {
        METHOD: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${API_KEY}`,
        }),
      });
    },
    [callback],
  );

  return useMemo(
    () => [status, wrappedCallback],
    [status, wrappedCallback],
  );
};

export const useFetchTMDBDetail = (transformFn = identity) => {
  const [status, callback] = useFetch(transformFn);

  const wrappedCallback = useCallback(
    (movieId, query = DEFAULT_QUERY) => {
      const url = new URL(`${DETAIL}/${movieId}`);
      if (!isEmpty(query)) {
        url.search = new URLSearchParams(query).toString();
      }
      return callback(url, {
        METHOD: 'GET',
        headers: new Headers({
          Authorization: `Bearer ${API_KEY}`,
        }),
      });
    },
    [callback],
  );

  return useMemo(
    () => [status, wrappedCallback],
    [status, wrappedCallback],
  );
};
