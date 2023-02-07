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




// interface recoPropType {
//   title: string;
//   typeId: string;
//   reqURL: {};
// }

//각각의 컴포넌트 배열을 여기에 넣어서 합쳐주고 싶음
const recomArray = [];

//해당 컴포넌트는 4개 복사되어 있고 각각의 프롭들 받아오는 중
const List = ({title, typeId, reqURL}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [recomSelected, setRecomSelected] = useState({})

  const fetchData = useCallback( async() => {
    const res = await instance.get('locationBasedList', {params: reqURL});
    setRecommendations(res.data.response.body.items.item);
    
    recomArray.push(...res.data.response.body.items.item)
    console.log('리콤배열', recomArray)
  }, [reqURL])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  const handleClick = (recommendation) => {
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
                <p className='mini_title'>#{recommendation.title}</p>
              </Slide>
            </SwiperSlide>
          ))}

        </Content>
      </Swiper>
      {modalOpen && 
        <Modal {...recomSelected} 
        setModalOpen={ setModalOpen }
        />
        }
    </div>
    
  )
}
export { recomArray }
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
