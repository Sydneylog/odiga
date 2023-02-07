import { configureStore } from "@reduxjs/toolkit";
import useLocation from '../slice/locationSlice'


const store = configureStore({
  reducer:{
    located: useLocation
  }
});

export default store;



