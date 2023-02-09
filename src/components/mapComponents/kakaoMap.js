import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {instance} from '../../api/axios';
import styled from 'styled-components';
import Map from './mapMaker';


const KakaoMap = () => {
   //현재위치 store에서 가져오기
  const position = useSelector(state => {
    return state.located.position
  })

  const markerImageSrc =
  "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"

  const imageSize = { width: 22, height: 26 }
  const spriteSize = { width: 36, height: 98 }
  const [loading, setLoading] = useState(false)
  const [totalArray, setTotalArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all")
  const getData = async () => {
      //API 호출
      try{
        setLoading(true)
        const res = await instance.get('locationBasedList', { params: {
          numOfRows: '100',
            pageNo: '1',
            MobileOS: 'ETC',
            MobileApp: 'AppTest',
            arrange:'Q',
            mapX: position.lng, //located.lng,
            mapY: position.lat, //located.lat,
            radius: '3000',
            listYN: 'Y'
      }}).then(res => setTotalArray(res.data.response.body.items.item))
      
      
    } catch(e) {
      console.log(e)
    }
    setLoading(false)
  };
  
    useEffect(() => {
      getData()
    }, []);

    console.log('불러온어레이',totalArray)
    //전체
    const showAllIcons = [totalArray.map(
    item => { 
      return {
        lat: item.mapy,
        lng: item.mapx
      }
    }
    )]
    const allOrigin = {x:20, y:15}
    //console.log(showAllIcons, allOrigin)
    //관광지 타입 12
    const sightSeeingIcons = [totalArray.filter((place => place.contenttypeid === '12'
      )).map(
      item => { 
        return {
          lat: item.mapy,
          lng: item.mapx
        }
      }
    )]
    console.log('야', sightSeeingIcons)
    const sightSeeingOrigin = {x:20, y:20}
    //문화시설 타입 14
    const culturalPlace = [totalArray.filter((place => place.contenttypeid === '14'
      )).map(
      item => { 
        return {
          lat: item.mapy,
          lng: item.mapx
        }
      }
    )]
    const culturalPlaceOrigin = {x:20, y:25}
    //행사공연축제 타입 15
    const festivals = [totalArray.filter((place => place.contenttypeid === '15'
      )).map(
      item => { 
        return {
          lat: item.mapy,
          lng: item.mapx
        }
      }
    )]
    const festivalsOrigin = {x:20, y:30}
    //쇼핑 타입 38
    const shopping = [totalArray.filter((place => place.contenttypeid === '15'
      )).map(
      item => { 
        return {
          lat: item.mapy,
          lng: item.mapx
        }
      }
    )]
    const shoppingOrigin = {x:20, y:35}
    //숙박 타입 32
    const accomondations = [totalArray.filter((place => place.contenttypeid === '15'
      )).map(
      item => { 
        return {
          lat: item.mapy,
          lng: item.mapx
        }
      }
    )]
    const accomondationsOrigin = {x:20, y:40}

  //category 선택에 따른 렌더링
  useEffect(()=>{
    const allMenu = document.getElementById('allMenu')
    const sightseeingMenu = document.getElementById('sightseeingMenu')
    const cultureMenu = document.getElementById('cultureMenu')
    const festivalMenu = document.getElementById('festivalMenu')
    const shoppingMenu = document.getElementById('shoppingMenu')
    
    if(selectedCategory === "all"){
      allMenu.className = "menu_selected"
      sightseeingMenu.className = ""
      cultureMenu.className = ""
      festivalMenu.className = ""
      shoppingMenu.className = ""
    } else if (selectedCategory === "sightseeing"){
      allMenu.className = ""
      sightseeingMenu.className = "menu_selected"
      cultureMenu.className = ""
      festivalMenu.className = ""
      shoppingMenu.className = ""
    } else if (selectedCategory === "culture"){
      allMenu.className = ""
      sightseeingMenu.className = ""
      cultureMenu.className = "menu_selected"
      festivalMenu.className = ""
      shoppingMenu.className = ""
    } else if (selectedCategory === "festival"){
      allMenu.className = ""
      sightseeingMenu.className = ""
      cultureMenu.className = ""
      festivalMenu.className = "menu_selected"
      shoppingMenu.className = ""
    } else if (selectedCategory === "shopping"){
      allMenu.className = ""
      sightseeingMenu.className = ""
      cultureMenu.className = ""
      festivalMenu.className = ""
      shoppingMenu.className = "menu_selected"
    }
  }, [selectedCategory])


  

 

  //관광지 12 / 문화시설 14 / 행사공연축제 15 / 여행코스 25 / 레포츠 28 / 쇼핑 38 / 숙박 32 /

  if(loading){
    return <div>로딩중</div>
  }

  if(!totalArray){
    return null
  }

  return (
    <>
    <div id='mapwrap'>
      <Map id='map'>
        {selectedCategory === 'all' &&
          showAllIcons.map((position) => (
            <MapMarker
              key={`all-${position.lat},${position.lng}`}
              position={position}
              image={{
                src: markerImageSrc,
                size: imageSize,
              }}
            />
        ))}
        {/* {selectedCategory === 'sightseeing' &&
          sightSeeingIcons.map((position) => (
            <MapMarker 
              key={`sightseeing-${position.lat},${position.lng}`}
              position={position}
              image={{
                src: markerImageSrc,
                size: imageSize,
                options: {
                  spriteSize: spriteSize,
                  spriteOrigin: sightSeeingOrigin
                }
              }}
            />
        ))}
        {selectedCategory === 'culture' &&
          culturalPlace.map((position) => (
            <MapMarker 
              key={`sightseeing-${position.lat},${position.lng}`}
              position={position}
              image={{
                src: markerImageSrc,
                size: imageSize,
                options: {
                  spriteSize: spriteSize,
                  spriteOrigin: culturalPlaceOrigin
                }
              }}
            />
        ))}
        {selectedCategory === 'festival' &&
          festivals.map((position) => (
            <MapMarker 
              key={`sightseeing-${position.lat},${position.lng}`}
              position={position}
              image={{
                src: markerImageSrc,
                size: imageSize,
                options: {
                  spriteSize: spriteSize,
                  spriteOrigin: festivalsOrigin
                }
              }}
            />
        ))}
        {selectedCategory === 'shopping' &&
          shopping.map((position) => (
            <MapMarker 
              key={`sightseeing-${position.lat},${position.lng}`}
              position={position}
              image={{
                src: markerImageSrc,
                size: imageSize,
                options: {
                  spriteSize: spriteSize,
                  spriteOrigin: shoppingOrigin
                }
              }}
            />
        ))}
        {selectedCategory === 'accomondations' &&
         accomondations.map((position) => (
            <MapMarker 
              key={`sightseeing-${position.lat},${position.lng}`}
              position={position}
              image={{
                src: markerImageSrc,
                size: imageSize,
                options: {
                  spriteSize: spriteSize,
                  spriteOrigin: accomondationsOrigin
                }
              }}
            />
        ))} */}
      </Map>

      {/* 마커카테고리 */}
      <div className='category'>
        <ul>
          <li id='allMenu' onClick={()=> {
            setSelectedCategory('all')}}>
            <span className='ico_comm ico_cofee'></span>
            전체
          </li>
          <li id='sightseeingMenu' onClick={()=> {
            setSelectedCategory('sightseeing')}}>
            <span className='ico_comm ico_store'></span>
            관광지
          </li>
          <li id='cultureMenu' onClick={()=> {
            setSelectedCategory('culture')}}>
            <span className='ico_comm ico_carpark'></span>
            문화시설
          </li>
          <li id='festivalMenu' onClick={()=> {
            setSelectedCategory('cfestival')}}>
            <span className='ico_comm ico_store'></span>
            축제
          </li>
          <li id='shoppingMenu' onClick={()=> {
            setSelectedCategory('shopping')}}>
            <span className='ico_comm ico_store'></span>
            쇼핑
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default KakaoMap

const MapMarker = styled.div`
`


