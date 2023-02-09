import { configureStore } from "@reduxjs/toolkit";
import useLocation from '../slice/locationSlice'
import usePlaces from '../slice/markerSlice'

const store = configureStore({
  reducer:{
    located: useLocation,
    places: usePlaces
  }
});

export default store;



