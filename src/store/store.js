import { configureStore } from '@reduxjs/toolkit';
import popupReducer from './popupSlice';
import frontLayoutReducer from './frontLayoutSlice';
import backLayoutSlice from './backLayoutSlice';
import fontReducer from './fontSlice';
import backInfoSlice from './backInfoSlice';
import cardSlice from './cardSlice';
import publicReducer from './publicSlice';
import testReducer from './testSlice';


const store = configureStore({
    reducer: {
        popup: popupReducer, // popupSlice를 store에 추가
        frontLayout: frontLayoutReducer,
        backLayout: backLayoutSlice,
        font: fontReducer,
        backInfo: backInfoSlice,
        card: cardSlice,
        publicSetting: publicReducer,
        test: testReducer
        
    },
});

export default store;
