import React from 'react'
import { useDispatch } from 'react-redux';


const Location = () => {
  const dispatch = useDispatch();

  navigator.geolocation.getCurrentPosition(getSuccess, getError)

  function getSuccess(position) {
    // 위도
    const lat = position.coords.latitude;
    // 경도
    const lng = position.coords.logitude;
    // 위도 경도 오차(m)
  }
  function getError() {
    alert('Geolocation Error');
  }
}


export default Location