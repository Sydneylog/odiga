import React, { useEffect, useState } from 'react'
import {instance, params} from '../../api/axios'
import './Banner.css'

function Banner() {
  
  const [info, setInfo] = useState([])
  const [title, setTitle] = useState('')
  const [addr, setAddr] = useState('')
  const [img, setImg] = useState([])

  // const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      // reqeust locationbased data
      const res = await instance.get('locationBasedList', { params: params})
      console.log(res)
      const resAddr = res.data.response.body.items; 
      let infoId = resAddr.item[Math.floor(Math.random() * 10)].contentid;
      //console.log('추천id', infoId)
      
      //get place detail
      let paramDetail = {
        contentId: String(infoId),
        defaultYN: 'Y',
        addrinfoYN: 'Y',
        overviewYN: 'Y',
        MobileOS: 'ETC',
        MobileApp: 'AppTest'
      }

      const placeDetail = await instance.get('detailCommon', {params:paramDetail})
      console.log('디테일', placeDetail)
      const infoAddr = placeDetail.data.response.body.items;
      setInfo(infoAddr.item[0].overview)
      setTitle(infoAddr.item[0].title)
      setAddr(infoAddr.item[0].addr1)

      //get image
      let paramImage = {
        numOfRows: '10',
        pageNo: '1',
        MobileOS: 'ETC',
        MobileApp: 'AppTest',
        contentId: String(infoId),
        imageYN: 'Y',
        subImageYN: 'Y'
      }

      const imageDetail = await instance.get('detailImage', {params:paramImage})
      console.log('이미지', imageDetail)
      const imgAddr = imageDetail.data.response.body.items;
      setImg(imgAddr.item[0].originimgurl)

    } catch (error) {
      console.log(error)
    }
    //console.log('이미지주소', img)
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
            <h3 className='banner_addr'>{ addr }</h3>
            { textLengthCut(String(info), 100) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner