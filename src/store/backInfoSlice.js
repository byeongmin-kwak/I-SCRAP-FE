// backInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    popName: '쿵야레스토랑즈 용기상점',
    place: '서울시 강남구 어딘가',
    date: '2024.09.15',
    price: '5000',
    companion: '박나리',
    rating: 0,
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
        resetBackInfo: (state) => {
            return initialState;
        }
    }
});

export const { setPopName, setPlace, setDate, setPrice, setCompanion, setRating, resetBackInfo } = backInfoSlice.actions;
export default backInfoSlice.reducer;
