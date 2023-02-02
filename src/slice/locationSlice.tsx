import { createSlice } from "@reduxjs/toolkit";





const initialState ={
  loaded: false,
  result: {
    lat: "37.71",
    lng: "126.73"
  }
}

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers:{
    getLocation: (state, action) => {
      state.result = action.payload;

    }
  }

})

export const {getLocation} = locationSlice.actions
export default locationSlice

