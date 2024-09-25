import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedBackLayout: 'layout1', // 선택된 레이아웃을 저장할 상태
  backLayoutColor: '#FFFFFF',
};

const backLayoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSelectedBackLayout: (state, action) => {
      state.selectedBackLayout = action.payload;
    },
    setBackLayoutColor: (state, action) => {
        state.backLayoutColor = action.payload; // 선택된 배경색 설정
      },
  },
});

export const { setSelectedBackLayout, setBackLayoutColor} = backLayoutSlice.actions;
export default backLayoutSlice.reducer;