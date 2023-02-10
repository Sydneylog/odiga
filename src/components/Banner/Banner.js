import React, { useEffect, useState } from 'react'
import {instance} from '../../api/axios'
import './Banner.css'
import Spinner from '../../assets/icons/Spin-1s-200px.svg'

function Banner() {
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
  
  const [info, setInfo] = useState([])
  const [title, setTitle] = useState('')
  const [addr, setAddr] = useState('')
  const [img, setImg] = useState([])
  const [dist, setDist] = useState('')
  const [loading, setLoading] = useState(false)

  const textLengthCut = (str, n) => {
    return str?.length > n ? str.substring(0, n) +'...' : str
  }

  const getDataByCurrentLocation = async (lat, lng) => {

    try{
      setLoading(true)
      let called = {
        numOfRows: '20',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        arrange:'Q',
        mapX: lng, //located.lng,
        mapY: lat, //located.lat,
        radius: '2000',
        listYN: 'Y'
      }
      const res = await instance.get('locationBasedList', { params: called})
    
      //api res 숏컷
      const resAddr = res.data.response.body.items; 
      console.log('받아온', resAddr)
      //난수 생성
      const getRandom = Math.floor(Math.random() * 10)
   
      //랜덤 컨텐츠 아이디 선택
      const infoId = resAddr.item[getRandom].contentid;
      setDist(resAddr.item[getRandom].dist);
      setImg(resAddr.item[getRandom].firstimage);
   
      //get place detail
      const paramDetail = {
        contentId: String(infoId),
        defaultYN: 'Y',
        addrinfoYN: 'Y',
        overviewYN: 'Y',
        MobileOS: 'ETC',
        MobileApp: 'AppTest'
      }
   
      const placeDetail = await instance.get('detailCommon', { params:paramDetail })
      //console.log('디테일', placeDetail)
      const infoAddr = placeDetail.data.response.body.items;
      setInfo(infoAddr.item[0].overview)
      setTitle(infoAddr.item[0].title)
      setAddr(infoAddr.item[0].addr1)
    } catch(err) {}
    setLoading(false)
  }
 
  if(loading) {
    return <div className='banner'>
            <div>
              <img src={Spinner} alt="loading" className='banner_loading'/>
            </div>
          </div>
  }
    

  return (
    <div className='banner'>    
      <div 
        className='banner_img'
        style = {{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}>
        <div className='text_box'>
          <h2 className='banner_title'>{ title }</h2>
          <div
            className='banner_desc'
          >
            <div className='info_title'>
              <h3 className='banner_addr'>{ addr }</h3>
              <p> { Math.round(Number(dist)) }m 거리에 위치</p>
            </div>
            { textLengthCut(String(info), 100) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner