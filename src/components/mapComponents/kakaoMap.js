import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './kakaoMap.css'
const {kakao} = window;
const KakaoMap = () => {
  const recoms = useSelector( state => {
    console.log("스테이트 구성", state)
    return state.recommendations
  }) 

  console.log('스토어추천 배열', recoms)



  const position = useSelector(state => {
    return state.located.position
  })

  useEffect(()=>{
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(position.lat, position.lng),
      level: 6
    };
    const map = new kakao.maps.Map(container, options);

    //중심 현재위치 마커
    if (position) {
      let lat = position.lat, // 위도
          lon = position.lng; // 경도
          
      let locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
          
      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);
      
    } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      
      var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
          message = 'geolocation을 사용할수 없어요..'
          
      displayMarker(locPosition, message);
    }

    // let positions = recoms.map(item => (
    //   key = item.contentid},
    //   title = item.title,
    //   lat = item.mapy,
    //   lng = item.mapx,
    //   img = item.firstimage,
    //   addr = item.addr1,
    //   isMarkClicked = false
    // ))

    // console.log('재배열:', positions)
    

    //마커표시 함수
    function displayMarker(locPosition, message) {
      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({  
          map: map, 
          position: locPosition
      }); 
      var iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;
      // 인포윈도우를 생성합니다
      var infowindow = new kakao.maps.InfoWindow({
          content : iwContent,
          removable : iwRemoveable
      });
      // 인포윈도우를 마커위에 표시합니다 
      infowindow.open(map, marker);
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);    

    }  


  

  }, [])

  return (
    <div id="map" className='kakao_map'>
      <ul className='menu_list'>
        <li>관광지</li>
        <li>문화시설</li>
        <li>행사</li>
        <li>쇼핑</li>
      </ul>
    </div>
  )
}

export default KakaoMap