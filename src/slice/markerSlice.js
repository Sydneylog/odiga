import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  places: []
};

const placeSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        setSightseeing: (state, action) => {
            state.places = action.payload;
        }
    }
})

export default placeSlice
export const {setSightseeing} = placeSlice.actions;

