// store/publicSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: 'open', // 초기값 설정
};

const publicSlice = createSlice({
    name: 'publicSetting',
    initialState,
    reducers: {
        setOpen: (state, action) => {
            state.open = action.payload; // open 상태 업데이트
        },
    },
});

export const { setOpen } = publicSlice.actions;

export default publicSlice.reducer;
