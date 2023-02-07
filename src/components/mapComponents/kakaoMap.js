import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {instance} from '../../api/axios';

import './kakaoMap.css'


const {kakao} = window;
const KakaoMap = () => {

  const position = useSelector(state => {
    return state.located.position
  })
  const [resultArray, setTotalArray] = useState(null)

  const getData = async () => {
    const res = await instance.get('locationBasedList', { params: {
      numOfRows: '40',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        arrange:'Q',
        mapX: position.lng, //located.lng,
        mapY: position.lat, //located.lat,
        radius: '2000',
        listYN: 'Y'
    }})

    const totalArray = []
    totalArray.push(res.data.response.body.items.item)
    setTotalArray(totalArray)
    console.log('총어레이',totalArray)
 
    console.log('넘어온', resultArray[0])
    
    //const designedArray = resultArray.map(location => (location.title))
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(position.lat, position.lng),
      level: 6
    };
    const map = new kakao.maps.Map(container, options);

    //const markerPosition  = new kakao.maps.LatLng(position.lat, position.lng)
    // let marker = new kakao.maps.Marker({
    //   position: markerPosition
    // });
    //marker.setMap(map);
    // 참고 https://velog.io/@nemo/react-error-cannot-read-property
    
    let positions = [resultArray && resultArray[0].map( location => {
      return {
        contentId: location.contentid,
        title: location.title,
        latlng: new kakao.maps.LatLng(location.mapy, location.mapx),
        img: location.firstimage,
        addr: location.addr1,
        dist: String(Math.floor(Math.round(location.dist)))
      }
    })]
    console.log('재배열',positions[0])
    console.log(positions[0].length)

    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    for (var i = 0; i < positions[0].length; i ++) {
    
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35); 
      
      // 마커 이미지를 생성합니다    
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[0][i].latlng, // 마커를 표시할 위치
          title : positions[0][i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : markerImage // 마커 이미지 
      });
    }
  } 
    
  useEffect(()=>{
    getData()
  }, [])

  return (
    <div id="map" className='kakao_map'>
      <ul className='menu_list'>
        <li>전체</li>
        <li>관광지</li>
        <li>문화시설</li>
        <li>행사</li>
        <li>쇼핑</li>
      </ul>
    </div>
  )
}

export default KakaoMap