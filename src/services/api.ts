import { type BaseQueryFn } from '@reduxjs/toolkit/query';
import type { FetchArgs } from '@reduxjs/toolkit/query';
// import type { Character } from '../components/card-list/card-list.types';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { PaginationProps } from '../components/pagination/pagination.types';

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  PaginationProps,
  unknown,
  object,
  { response?: Response }
> = async (args) => {
  const rawResponse = await fetch(typeof args === 'string' ? args : args.url);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await rawResponse.json();

  return {
    data,
    meta: {
      response: rawResponse,
    },
  };
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getCharacters: builder.query<PaginationProps, string>({
      query: (url) => url,
    }),
  }),
});

export const { useGetCharactersQuery, useLazyGetCharactersQuery } = api;
