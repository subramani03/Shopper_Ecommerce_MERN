import React from 'react';
import './Sidebar.css'
import { Link } from 'react-router-dom';
import Product_Cart from "../../assets/Admin_Assets/Product_Cart.svg";
import Product_list_icon from "../../assets/Admin_Assets/Product_list_icon.svg";

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to="/addproduct" style={{textDecoration:'none', color:'black'}}>
                <div className="side-product-item">
                    <img src={Product_Cart} alt="Product Cart" />
                    <p>Add product</p>

                </div>
            </Link>
            <Link to="/allproducts" style={{textDecoration:'none', color:'black'}}>
                <div className="side-product-item">
                    <img src={Product_list_icon} alt="Product Cart" />
                    <p>List Products</p>
                </div>
            </Link>

        </div>
    )
}

export default Sidebar
