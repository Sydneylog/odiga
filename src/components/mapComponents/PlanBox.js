import React from 'react'
import{useRef} from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside';

function PlanBox({setMemoOpen}) {
  const ref = useRef();
  useOnClickOutside(ref, () => {
    setMemoOpen(false)
  })
  
  return (
    <div className='select_box'>
      <div className='x_button' onClick={()=>{setMemoOpen(false)}}>X</div>
      <div className='innerBoxes'>
        <h3>My plan</h3>
        <div className='selected_place'>
          <p>선택된 장소들</p>
        </div>
      </div>
    </div>
  )
}

export default PlanBox