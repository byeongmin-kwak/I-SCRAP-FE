import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedLayout: null, // 선택된 레이아웃을 저장할 상태
  backgroundColor: '#FFFFFF',
};

const frontLayoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSelectedLayout: (state, action) => {
      state.selectedLayout = action.payload;
    },
    setBackgroundColor: (state, action) => {
        state.backgroundColor = action.payload; // 선택된 배경색 설정
      },
  },
});

export const { setSelectedLayout, setBackgroundColor} = frontLayoutSlice.actions;
export default frontLayoutSlice.reducer;
