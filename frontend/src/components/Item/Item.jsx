import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';


const Item = (data) => {

    const { id, name, new_price, image, old_price } = data.data;
    return (
        <div className='items'>
           
           <Link to={`/product/${id}`}><img onClick={()=>{window.scrollTo(0,0)}} src={image} alt="" /></Link> 
            <h3>{name}</h3>
            <div className="price">
                <p className='new-price'>${new_price}</p>
                <p className='old-price'>${old_price}</p>
            </div>
        </div>
    )
}

export default Item
