// backInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popName: '',
    place: '',
    date: new Date().toISOString().slice(0, 10), // 오늘 날짜 기본값
    price: '',
    companion: '',
    rating: 0,
    comment: ''
};

const backInfoSlice = createSlice({
    name: 'backInfo',
    initialState,
    reducers: {
        setPopName: (state, action) => {
            state.popName = action.payload;
        },
        setPlace: (state, action) => {
            state.place = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        setCompanion: (state, action) => {
            state.companion = action.payload;
        },
        setRating: (state, action) => {
            state.rating = action.payload;
        },
        setComment: (state, action) => {
            state.comment = action.payload;
        },
        resetBackInfo: (state) => {
            return initialState;
        }
    }
});

export const { setPopName, setPlace, setDate, setPrice, setCompanion, setRating, setComment, resetBackInfo } = backInfoSlice.actions;
export default backInfoSlice.reducer;
