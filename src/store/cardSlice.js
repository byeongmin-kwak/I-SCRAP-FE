import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  image: null,       // 업로드된 이미지
  texts: [],         // 추가된 텍스트
  stickers: [],      // 추가된 스티커
  savedCardImage: null,
  savedBackImage: null,
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    setTexts: (state, action) => {
      state.texts = action.payload;
    },
    setStickers: (state, action) => {
      state.stickers = action.payload;
    },
    setSavedCardImage: (state, action) => {
        state.savedCardImage = action.payload;
    },
    setSavedBackImage: (state, action) =>{
        state.savedBackImage = action.payload;
    },
    // 텍스트 추가 액션
    addText: (state, action) => {
      state.texts.push(action.payload);
    },
    // 스티커 추가 액션
    addSticker: (state, action) => {
      state.stickers.push(action.payload);
    },
    // 텍스트 수정 액션 (특정 텍스트의 업데이트)
    updateText: (state, action) => {
      const { index, newText } = action.payload;
      state.texts[index] = newText;
    },
    // 스티커 수정 액션 (특정 스티커의 업데이트)
    updateSticker: (state, action) => {
      const { index, newSticker } = action.payload;
      state.stickers[index] = newSticker;
    },
  },
});

export const { setImage, setTexts, setStickers, addText, addSticker, updateText, updateSticker, setSavedCardImage, setSavedBackImage } = cardSlice.actions;
export default cardSlice.reducer;
