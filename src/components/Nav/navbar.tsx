import { ReactComponent as Logo } from '../../assets/icons/logoipsum-284.svg'
import NavMenu from './navmenu'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Logo />
        </div>
        <div>
          <NavMenu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
