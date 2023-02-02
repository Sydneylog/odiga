import React, { useEffect, useState } from 'react'
import {instance} from '../../api/axios'
import requests from '../../api/requests'
import './Banner.css'

function Banner() {
  
  const [info, setInfo] = useState([])
  const [title, setTitle] = useState('')
  const [addr, setAddr] = useState('')
  const [img, setImg] = useState([])
  const [dist, setDist] = useState('')

  // const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      // reqeust locationbased data
      const res = await instance.get('locationBasedList', { params: requests.fetchBasePath})
      //console.log('위치기반데이터', res)

      const resAddr = res.data.response.body.items; 
      const getRandom = Math.floor(Math.random() * 10)
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
     

    } catch (error) {
      console.log(error)
    }
    
  }
const textLengthCut = (str:string, n:number) => {
    return str?.length > n ? str.substring(0, n) +'...' : str
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