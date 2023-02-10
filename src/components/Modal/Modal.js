import React, { useRef, useState, useEffect} from 'react'
import { instance } from '../../api/axios';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Spinner from '../../assets/icons/black.svg';
import './modal.css'

// interface modalProps {
//   addr1:string;
//   dist:string;
//   firstimage:string;
//   title:string;
//   setModalOpen?:any;
//   tel?:string;
// }


const Modal =({addr1, dist, contentid, firstimage, title, setModalOpen}) => {
  const [overview, setOverview] = useState('')
  const [loading, setLoading] = useState(false)
  const distRound = Math.round(Number(dist));
  const ref = useRef();
  console.log('ref', ref.current);
  useOnClickOutside(ref, () => {
  setModalOpen(false);
  })



  const getRes = async () => {
    try {
      setLoading(true)
      const paramDetail = {
        contentId: contentid,
        defaultYN: 'Y',
        addrinfoYN: 'Y',
        overviewYN: 'Y',
        MobileOS: 'ETC',
        MobileApp: 'AppTest'
      }
      const getContId = await instance.get('detailCommon', {params:paramDetail})
      const overview = getContId.data.response.body.items.item[0].overview;
      setOverview(overview)

    } catch (err){
      console.log(err);
    }
    setLoading(false)
  }

  useEffect(() => {
    getRes()
  }, [])

  const textLengthCut = (str:string, n:number) => {
    return str?.length > n ? str.substring(0, n) +'...' : str
  }

  
  return (
    <div className='whole' role="presentation">
      <div className='modal_wrap'>
        <div className="modal">
          <span 
            className="modal_close"
            onClick={() => setModalOpen(false)}
          >
            X
          </span>

          <img
            className='modal_img' 
            src={`${firstimage}`}
            alt={ title }
          />

          <div className='modal_content'>
            <h2>장소명: { title }</h2>
            <ul>
              <li><span className='bold'>주소</span>: { addr1 }</li>
              <li><span className='bold'>현재 위치에서의 거리</span>: { distRound }m</li>
              {loading? <img src={Spinner} alt='loading' className='overview_loading'/> : <li><span className='bold'>장소 소개</span><br/> { textLengthCut(overview, 100) }</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

