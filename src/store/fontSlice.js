// src/redux/fontSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedFont: 'Cafe24 Simplehae', // 기본 폰트 설정
    selectedFontColor: 'black',
};

const fontSlice = createSlice({
    name: 'font',
    initialState,
    reducers: {
        setFont: (state, action) => {
            state.selectedFont = action.payload; // 선택된 폰트 업데이트
        },
        setSelectedFontColor: (state, action) => {
            state.selectedFontColor = action.payload; // 선택된 폰트 업데이트
        },
    },
});

export const { setFont, setSelectedFontColor } = fontSlice.actions;
export default fontSlice.reducer;
