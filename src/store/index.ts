import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterSlice';

export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
