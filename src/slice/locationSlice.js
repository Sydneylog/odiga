import { createSlice } from "@reduxjs/toolkit";

navigator.geolocation.getCurrentPosition(getSuccess)

function getSuccess(position) {
  // 위도
  const lat = position.coords.latitude;
  // 경도
  const lng = position.coords.logitude;
  
  console.log(lat)
}


const initialState ={
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

