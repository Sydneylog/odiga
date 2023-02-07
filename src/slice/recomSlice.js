import { createSlice } from "@reduxjs/toolkit";
import { recomArray } from "../components/Recommendations";
(function(){
  console.log('전해진배열', recomArray);
})()

const initialState = {
  places: recomArray
}

const recomSlice = createSlice({
  name: "recomPlaces",
  initialState,
  reducers:{
    setLocation: (state, action) => {
      state.places = action.palyload;
    }
  }

})

export default recomSlice.reducer;