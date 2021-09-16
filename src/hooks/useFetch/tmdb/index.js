import { API_KEY, BASE_URL } from 'secrets';

import identity from 'helpers/identity';

import useFetch from 'hooks/useFetch';
import { useCallback, useMemo } from 'react';

// CONSTANTS
const CONFIG = `${BASE_URL}/configuration`;

const POPULAR = `${BASE_URL}/movie/popular`;
const UPCOMING = `${BASE_URL}/movie/upcoming`;
const DETAIL = `${BASE_URL}/movie`;

const DEFAULT_QUERY = {};

// HOOKS
export const useFetchTMDBConfig = (transformFn = identity) => {
  const [status, callback] = useFetch(transformFn);

  const wrappedCallback = useCallback(
    () => {
      const url = new URL(CONFIG);
      url.search = new URLSearchParams({ api_key: API_KEY }).toString();
      return callback(url, {
        METHOD: 'GET',
      });
    },
    [callback],
  );

  return useMemo(
    () => [status, wrappedCallback],
    [status, wrappedCallback],
  );
};

export const useFetchTMDBPopular = (transformFn = identity) => {
  const [status, callback] = useFetch(transformFn);

  const wrappedCallback = useCallback(
    (query = DEFAULT_QUERY) => {
      const url = new URL(POPULAR);
      url.search = new URLSearchParams({ ...query, api_key: API_KEY }).toString();
      return callback(url, {
        METHOD: 'GET',
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
      url.search = new URLSearchParams({ ...query, api_key: API_KEY }).toString();
      return callback(url, {
        METHOD: 'GET',
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
      url.search = new URLSearchParams({ ...query, api_key: API_KEY }).toString();
      return callback(url, {
        METHOD: 'GET',
      });
    },
    [callback],
  );

  return useMemo(
    () => [status, wrappedCallback],
    [status, wrappedCallback],
  );
};
