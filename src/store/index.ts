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
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
