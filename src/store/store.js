import { configureStore } from "@reduxjs/toolkit";
import useLocation from '../slice/locationSlice'
import useRecomArray from '../slice/recomSlice'


const store = configureStore({
  reducer:{
    located: useLocation,
    recommendations: useRecomArray
  }
});

export default store;



