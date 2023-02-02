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




interface recoPropType {
  title: string;
  typeId: string;
  reqURL: {};
}

const List = ({title, typeId, reqURL}:recoPropType) => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [recomSelected, setRecomSelected] = useState({})

  console.log('리커먼',recomSelected);
  


  const fetchData = useCallback( async() => {
    const res = await instance.get('locationBasedList', {params: reqURL});
    //console.log('추천리스트', res);
    setRecommendations(res.data.response.body.items.item);
     
  }, [reqURL])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  const handleClick = (recommendation:any) => {
    setModalOpen(true);
    setRecomSelected(recommendation);
  }

  
  return (
    <div className='recom_list_wrap'>
      <h2 className='recom_title'>{ title }</h2>
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
                <img
                  key={recommendation.contentid}
                  src={`${recommendation.firstimage}`}
                  alt={recommendation.title}
                  onClick={() => handleClick(recommendation)}
                />
                <p className='mini_title'>{recommendation.title}</p>
              </Slide>
            </SwiperSlide>
          ))}

        </Content>
      </Swiper>
      {modalOpen && 
        <Modal {...recomSelected} 
        setModalOpen={ modalOpen }
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
    rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(0.98);
    border-color: rgba(249, 249, 249, 0.8);
    opacity:0.65
    
  }
  
 
`
