import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import Nav from './Nav/Nav'
import MobileMenu from './MobileMenu/MobileMenu'
import Cart from '../../Cart/Cart'
import crown from '../../../assets/crown.svg'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuToggleHandler = () => {
    setIsMenuOpen((prevState) => !prevState)
  }

  return (
    <header className="header">
      <div>
        <NavLink activeClassName="active" to="/">
          <img className="logo" src={crown} alt="logo-crown" />
        </NavLink>
      </div>
      <div className="navbar">
        <Nav />
        <Cart />
      </div>

      <div className="mobileMenu">
        <div onClick={menuToggleHandler} className="mobileMenu__btn">
          <p></p>
          <p></p>
          <p></p>
        </div>
      </div>

      <MobileMenu
        onMenuClosing={menuToggleHandler}
        classes={`mobileMenu__inner ${
          isMenuOpen ? 'mobileMenu__inner--open' : ''
        }`}
      />
    </header>
  )
}

export default Header
