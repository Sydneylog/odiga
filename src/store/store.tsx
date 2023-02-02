import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slice/recoModalSlice";
import locationGet from "../slice/locationSlice"

const store = configureStore({
  reducer:{
    modal: modalReducer.reducer,
    location: locationGet.reducer
  }
});

export default store;



