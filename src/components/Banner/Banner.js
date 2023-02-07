import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {instance} from '../../api/axios'
import './Banner.css'

function Banner() {
  // const [located, setLocated] = useState({})
  // function getSuccess(position) {
  //   const positionObj = {
  //     lat : position.coords.latitude,
  //     lng : position.coords.longitude,
  //   }
  //   setLocated(positionObj)
  //   console.log('처음실행', located);
  // }
  // function getError() {
  //   alert('현재위치를 찾을 수 업습니다.');
  // }
  
  // const getLocation = () => {
  //   navigator.geolocation.getCurrentPosition(getSuccess, getError)
  //   getData()
  // }


  const position = useSelector((state) => {
    return state.located.position
  })
  
  const [info, setInfo] = useState([])
  const [title, setTitle] = useState('')
  const [addr, setAddr] = useState('')
  const [img, setImg] = useState([])
  const [dist, setDist] = useState('')

  const textLengthCut = (str, n) => {
    return str?.length > n ? str.substring(0, n) +'...' : str
  }

  const getData = async () => {
    const lat = position.lat
    const lng = position.lng
    console.log(lat, lng)

    const res = await instance.get('locationBasedList', { params: {
      numOfRows: '20',
      pageNo: '1',
      MobileOS: 'ETC',
      MobileApp: 'AppTest',
      arrange:'Q',
      mapX: lng, //located.lng,
      mapY: lat, //located.lat,
      radius: '2000',
      listYN: 'Y'
  }})
      
    //api res 숏컷
    const resAddr = res.data.response.body.items; 
    
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
  }

  useEffect(() => {
    getData();
  }, [])

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