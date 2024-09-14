import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popupSlice';
import frontLayoutReducer from './frontLayoutSlice';
import fontReducer from './fontSlice';

const store = configureStore({
    reducer: {
        popup: popupReducer, // popupSlice를 store에 추가
        frontLayout: frontLayoutReducer,
        font: fontReducer,
    },
});

export default store;
