import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: {
    lat: "37.71", 
    lng: "126.73"
  }
}

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers:{
    setLocation: (state, action) => {
      state.position = action.palyload;
    }
  }

})

export default locationSlice.reducer;

