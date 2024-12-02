import React, { useContext, useRef, useState } from 'react';
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png";

import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';



const Navbar = () => {

  const { LogState, setLogstate } = useState("Login");
  const { totalCartItem, menu, setMenu } = useContext(ShopContext);
  const menuRef = useRef();
  const navDownVisible = (e) => {
    menuRef.current.classList.toggle("nav_down_visible");
    e.target.classList.toggle("open");
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img src={nav_dropdown} onClick={navDownVisible} className='navbar-dropdown-icon' alt="dropdown" />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => { setMenu("shop") }}><Link to='/' style={{ textDecoration: 'none', color: 'black' }}>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("men") }}><Link to='/men' style={{ textDecoration: 'none', color: 'black' }}>Men</Link> {menu === "men" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("women") }}><Link to='/women' style={{ textDecoration: 'none', color: 'black' }}>Women</Link> {menu === "women" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kid") }}><Link to='/kid' style={{ textDecoration: 'none', color: 'black' }}>Kids</Link> {menu === "kid" ? <hr /> : <></>}</li>
      </ul>

      <div className="nav-login-cart">

        {
          localStorage.getItem('auth-token') ? (
            <button onClick={()=>{
              localStorage.removeItem('auth-token');
              window.location.replace('/');
            }} >LOGOUT</button>
          ) : (
            <Link to="/login">
              <button>LOGIN</button>
            </Link>

          )
        }


        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <p className="nav-cart-count">{totalCartItem()}</p>
      </div>
    </div>
  )
}

export default Navbar
