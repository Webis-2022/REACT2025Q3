import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.py4e.com/api/',
  }),

  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ search = '', page = 1, cacheBuster = 0 }) =>
        `people/?search=${search}&page=${page}&_=${cacheBuster}`,
      providesTags: ['Characters'],
    }),
    getCharacterById: builder.query({
      query: (id) => `people/${id}/`,
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useLazyGetCharactersQuery,
  useGetCharacterByIdQuery,
  useLazyGetCharacterByIdQuery,
} = api;
