import React, { useContext } from 'react';
import './Breadcrums.css';
import breadcrum_arrow from "../Assets/breadcrum_arrow.png";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Breadcrums = (props) => {
  const { product } = props;
  const {setMenu}= useContext(ShopContext);
  return (
    <div className='breadcrum'>
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }} onClick={() => { setMenu("shop") }}>HOME</Link><img src={breadcrum_arrow} alt="breadcrum icon" />
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }} onClick={() => { setMenu("shop") }}>SHOP</Link>  <img src={breadcrum_arrow} alt="breadcrum icon" /> 
      <Link to={`/${product.category}`}  style={{ textDecoration: 'none', color: 'black' }} onClick={() => { setMenu(product.category) }}>{product.category}</Link>  <img src={breadcrum_arrow} alt="breadcrum icon" />
      {product.name}
    </div>
  )
}

export default Breadcrums
