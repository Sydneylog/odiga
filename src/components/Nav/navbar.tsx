import React, { useState } from 'react'
import { ReactComponent as Logo } from '../../assets/icons/logoipsum-284.svg'
import NavMenu from './navmenu'
import './navbar.css'
import { HiMenu } from 'react-icons/hi';
import MobileMenu from '../MobileMenu';


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
            <Logo />
          </div>
          <div>
            <NavMenu />
          </div>
          <div className='mobile_menu_icon' onClick={handleClick}>
            <HiMenu size='40' color="white"/>
          </div>
        </div>
      </nav>
      <div>
        {isOpen ? <MobileMenu /> : null}
      </div>
    </>
  )
}

export default Navbar
