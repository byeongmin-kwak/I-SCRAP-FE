// src/store/testSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategories: [],  // 선택된 카테고리들을 저장하는 상태
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.selectedCategories = action.payload;
    },
  },
});

export const { setCategories } = testSlice.actions;
export default testSlice.reducer;
