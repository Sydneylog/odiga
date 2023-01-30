import React from 'react'
import { NavLink } from 'react-router-dom'

function navmenu() {
  return (
    <ul className='nav-elements'>
      <li><NavLink to='/' className='nav-link'>Home</NavLink></li>
      <li><NavLink to='searchplace' className='nav-link'>여행 장소 찾기</NavLink></li>
      <li><NavLink to='myplans' className='nav-link'>My plans </NavLink></li>
    </ul>
  )
}

export default navmenu
