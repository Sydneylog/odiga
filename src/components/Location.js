import {useState, useEffect} from 'react'

const Location = () => {
  const [located, setLocated] = useState({lat:'37.71', lng:'126.73'})

  useEffect(() => {
    function getSuccess(position) {
      const positionObj = {
        lat : position.coords.latitude,
        lng : position.coords.longitude,
      }
      setLocated(positionObj)
      console.log('처음실행', located);
    }
    function getError() {
      alert('현재위치를 찾을 수 업습니다.');
    }
    const getPositionObj = () => {
      navigator.geolocation.getCurrentPosition(getSuccess, getError)
    }
    getPositionObj()
    
  }, [])
}


export default Location

