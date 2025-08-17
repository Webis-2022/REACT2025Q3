'use client';

import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';
import { api } from '../services/api';

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
