import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {instance} from '../../api/axios';
import PlanBox from './PlanBox';
import Spinner from '../../assets/icons/Spin-1s-200px.svg'
import './kakaoMap.css'



const {kakao} = window;


const KakaoMap = () => {
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      console.log(lat, lng);
      getDataByCurrentLocation(lat, lng);
    })
  };
  useEffect(() => {
    getCurrentLocation()
  },[])
  const [places, setPlaces] = useState();
  const [loading, setLoading] = useState(false);
  const [isMemoOpen, setMemoOpen] = useState(false);


  //배열 마커 이미지
  const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  //현재위치 store에서 가져오기
  const position = useSelector(state => {
    return state.located.position
  })
  //호출된 배열 관리
  const totalArray = []

  const  getDataByCurrentLocation = async (lat, lng) => {
    //API 호출
    try{
      setLoading(true)
      const res = await instance.get('locationBasedList', { params: {
        numOfRows: '100',
          pageNo: '1',
          MobileOS: 'ETC',
          MobileApp: 'AppTest',
          arrange:'Q',
          mapX: lng, //located.lng,
          mapY: lat, //located.lat,
          radius: '3000',
          listYN: 'Y'
      }})
      //배열 전역 변수로 저장
      await totalArray.push(res.data.response.body.items.item)
    } catch(e){
      console.log(e)
    }
    setLoading(false)
    
    //console.log('총어레이',totalArray)
    //현재위치 마커 세팅
    // 참고 https://velog.io/@nemo/react-error-cannot-read-property
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 6
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition  = new kakao.maps.LatLng(lat, lng)
    const marker = new kakao.maps.Marker({
      position: markerPosition
    });
    //현재위치 마커 표시
    marker.setMap(map);
    
    //totalArray 커스터마이징



    const positions = [await totalArray[0].map( location => {
      return {
        typeid: location.contenttypeid,
        contentId: location.contentid,
        title: location.title,
        latlng: new kakao.maps.LatLng(location.mapy, location.mapx),
        img: location.firstimage,
        addr: location.addr1,
        dist: String(Math.floor(Math.round(location.dist))),
        selected: true

      }
    })] 
    // console.log('재배열',positions[0])
    // console.log(positions[0].length)

    const filteredPositions = await positions[0].filter( position => position.selected === true)
    console.log('테스트 필터링', filteredPositions)


    for (var i = 0; i < filteredPositions.length; i ++) {
      // 마커 이미지의 이미지 크기 입니다
      const imageSize = new kakao.maps.Size(24, 35); 
      // 마커 이미지를 생성합니다    
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          key: filteredPositions[i].contentId,
          position: filteredPositions[i].latlng, // 마커를 표시할 위치
          title : filteredPositions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : markerImage // 마커 이미지 
      });
      let iwContent = `
                      <div style="font-family:Dongle;font-size:1.5rem;width:250px;height:auto;background-color:#222;color:white">
                        <img src="${filteredPositions[i].img}" width="100%">
                        <div style="margin-left:5px;font-weight:300;padding:10px;box-sizing:border-box;">
                          <p style="font-weight:400;margin-bottom:5px">이름: ${filteredPositions[i].title}</P>
                          <p style="margin-bottom:3px">주소: ${filteredPositions[i].addr}</p>
                          <p>현재 위치에서의 거리: ${filteredPositions[i].dist}m</p>
                        </div>
                      </div>
                      `
      let infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        
      });
      kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
      kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));;
    }
    function makeOverListener(map, marker, infowindow) {
      return function() {
          infowindow.open(map, marker);
      };
    }
    function makeOutListener(infowindow) {
      return function() {
          infowindow.close();
      };
    }
  }

  

 
  if(loading){
    return <div className='loading_wrap'>
            <div>
              <img src={Spinner} alt="loading" className='loading'/>
              <p className='loading_text'>로딩 중입니다.</p>
            </div>
          </div>
  }
 
  return (
    <div id='mapwrap'>
      <div id='map' style={{width:'100vw', height:'100vh'}}></div>
      <div className='category'>
        <ul className='menu_list'>
          <li id='sightseeingMenu'>
            <span className='ico_comm ico_store'></span>
            관광지
          </li>
          <li>
            <span className='ico_comm ico_carpark'></span>
            문화시설
          </li>
          <li>
            <span className='ico_comm ico_store'></span>
            축제
          </li>
          <li>
            <span className='ico_comm ico_store'></span>
            쇼핑
          </li>
        </ul>
      </div>
      <div className='memo_icon' onClick={(()=>{setMemoOpen(!isMemoOpen)})}>메모</div>
        {isMemoOpen ? <PlanBox setMemoOpen={setMemoOpen}/> : null}
    </div>

    
  )
}

export default KakaoMap
