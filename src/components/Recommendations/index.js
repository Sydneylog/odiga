import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components';
import { Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { instance } from '../../api/axios';
import Modal from '../Modal/Modal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import './recommendation.css';
import noImage from '../../assets/no_image.gif'

// interface recoPropType {
//   title: string;
//   typeId: string;
//   reqURL: {};
// }



//해당 컴포넌트는 4개 복사되어 있고 각각의 프롭들 받아오는 중
const List = ({title, typeId}) => {
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

  const [recommendations, setRecommendations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [recomSelected, setRecomSelected] = useState({})

  const getDataByCurrentLocation =  async(lat, lng) => {
    let called = {
      contentTypeId: typeId,
      numOfRows: '10',
      pageNo: '1',
      MobileOS: 'ETC',
      MobileApp: 'AppTest',
      arrange:'Q',
      mapX: lng,
      mapY: lat,
      radius: '3000',
      listYN: 'Y'
    }
    const res = await instance.get('locationBasedList', {params: called});
    setRecommendations(res.data.response.body.items.item);
    console.log('추천리스트', res);
    
  }


  const handleClick = (recommendation) => {
    setModalOpen(true);
    setRecomSelected(recommendation);
  }
  
  return (
    <div className='recom_list_wrap'>
      <h2 className='recom_title'>{ title }</h2>
      {recommendations ?  
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true}
          navigation
          pagination={{ clickable: true}}
          breakpoints={{
            1500: {
              slidesPerView: 5,
              slidesPerGroup: 5
            },
            1370: {
              slidesPerView: 5,
              slidesPerGroup: 5
            },
            998: {
              slidesPerView: 4,
              slidesPerGroup: 4
            },
            625: {
              slidesPerView: 3,
              slidesPerGroup: 3
            },
            0: {
              slidesPerView: 2,
              slidesPerGroup: 2
            }
          }}
      >
        <Content id = {typeId}>
          {recommendations.map(recommendation => (
            <SwiperSlide>
              <Slide>
                {recommendation.firstimage ? 
                  <img
                    key={recommendation.contentid}
                    src={`${recommendation.firstimage}`}
                    alt={recommendation.title}
                    onClick={() => handleClick(recommendation)}
                  />
                : <img src={noImage} alt='이미지가 없습니다'/>}
                <p className='mini_title'>#{recommendation.title}</p>
              </Slide>
            </SwiperSlide>
          ))}

        </Content>
      </Swiper>
      : <p className='no_data'> {title}에 해당하는 데이터가 없습니다.</p>}
      {modalOpen && 
        <Modal {...recomSelected} 
        setModalOpen={ setModalOpen }
        />
        }
        
    </div>
    
  )
}

export default List



const Content = styled.div`
`
const Slide = styled.div`
  width: 95%;
  height: 95%;
  padding-top: 56%;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  border: 3px solid rgba(249, 249, 249, 0.1);

  img {
    inset: 0px;
    display: block;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    width: 100%;
    transition: opacity 500ms ease-in-out;
    z-index:2;
  }

  &:hover {
    rgb(255 242 242 / 72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
    
  }
  
 
`
