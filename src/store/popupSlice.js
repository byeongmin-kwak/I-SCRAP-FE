import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
    name: 'popup',
    initialState: {
        selectedPopup: null, // 선택된 팝업의 데이터를 저장
    },
    reducers: {
        setSelectedPopup: (state, action) => {
            state.selectedPopup = action.payload; // 선택된 팝업의 데이터를 저장
        },
        clearSelectedPopup: (state) => {
            state.selectedPopup = null; // 선택된 팝업 데이터 초기화
        }
    }
});

export const { setSelectedPopup, clearSelectedPopup } = popupSlice.actions;
export default popupSlice.reducer;
