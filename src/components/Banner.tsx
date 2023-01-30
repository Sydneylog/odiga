import React, { useEffect } from 'react'
import axios from '../api/axios'
import requests from '../api/requests'



function Banner() {
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const res = await axios.get(requests.fetchLocationBase);
    console.log(res)
    console.log(axios.get(requests.fetchLocationBase))
  }
  fetchData()


  return (
    <>    
      <div>목록</div>
      <div>목록</div>
      <div>목록</div>
      <div>목록</div>
      <div>목록</div>
      <div>목록</div>
    </>


  )
}

export default Banner