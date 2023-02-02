import React, { useState } from 'react'
import NavMenu from './navmenu'
import './navbar.css'
import { HiMenu } from 'react-icons/hi';
import MobileMenu from './mobileMenu';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: any) => {
    setIsOpen(prev => prev ? false : true);
  }

  return (
    <>
      <nav className='navbar'>
        <div className='container'>
          <div className='logo'>
            <img
              className='logo_img'
              src='./odigaLogo.png' 
              alt="오디가"
            />
          </div>
          <div className='desktop'>
            <NavMenu />
          </div>
          <div className='mobile'>
            {isOpen ? <MobileMenu /> : null}
          </div>
          <div className='mobile_menu_icon' onClick={handleClick}>
            <HiMenu size='40' color="white"/>
          </div>
        </div>
      </nav>
      
    </>
  )
}

export default Navbar

