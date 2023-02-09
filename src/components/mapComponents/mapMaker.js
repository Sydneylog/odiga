import {useRef, useEffect} from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

/*global kakao*/
const KakaoMap = () => {
  const { kakao } = window
  const position = useSelector(state => {
    return state.located.position
  })

  // const container = useRef(null)
  // const options = {
  //   center: new kakao.maps.LatLng(position.lat, position.lng),
  //   level: 6
  // }

  useEffect(() => {
    // new kakao.maps.Map(container.current, options) 
    // return() => {};
    displayMarker()
  }, []);

  

  const displayMarker = () => {
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(position.lat, position.lng),
      level: 6
    }
    //맵생성
    const map = new kakao.maps.Map(container, options);

    //현재위치 마커생성
    let currentMarker = new kakao.maps.LatLng(position.lat, position.lng)
    console.log('현재 마커 위치', currentMarker)

    let marker = new kakao.maps.Marker({
      position: currentMarker
    });
    marker.setMap(map)
  }


  return (
    <div id='map' style={{width:'100vw', height:'100vh'}}>
      <div
        position={{
          lat:position.lat,
          lng:position.lng
        }}
        >마커</div>
    </div>
  )
}

export default KakaoMap

const Current = styled.div`
`