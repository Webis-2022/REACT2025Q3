import { createSlice } from '@reduxjs/toolkit';
import type { CharactersState } from './characterSlice.types';

const initialState: CharactersState = {
  selectedIds: [],
};

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    toggleSelection(state, action) {
      const id: number = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((itemId) => itemId !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    clearSelection(state) {
      state.selectedIds = [];
    },
  },
});

export const { toggleSelection, clearSelection } = characterSlice.actions;
export default characterSlice.reducer;