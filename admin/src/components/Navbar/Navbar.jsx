import React from 'react'
import nav_logo from '../../assets/Admin_Assets/nav-logo.svg';
import nav_profile from '../../assets/Admin_Assets/nav-profile.svg';
import './Navbar.css'


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={nav_logo} alt="nav logo" className='navlogo'/>
        <img src={nav_profile} alt="nav logo" className='navProfile'/>
    </div>
  )
}

export default Navbar
