import React, { useRef} from 'react'
import './modal.css'

interface modalProps {
  addr1:string;
  dist:string;
  firstimage:string;
  title:string;
  setModalOpen:any;
  tel?:string;
}

const Modal =({addr1, dist, firstimage, title, setModalOpen, tel}:modalProps) => {
  const distRound = Math.round(Number(dist));
  const ref = useRef();
  console.log('ref', ref.current);

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
              <li>주소: { addr1 }</li>
              <li>현재 위치에서의 거리: { distRound }m</li>
              <li>전화: { tel==="" ? null : tel }</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

