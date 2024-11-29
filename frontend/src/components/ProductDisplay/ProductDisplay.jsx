import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (product) => {
  const item = product.product;;
  const {addToCart,cartItem} = useContext(ShopContext);
  return (
    <div className='productDisplay'>
      <div className='productDisplay-left'>
        <div className="productDisplay-img-list">
          <img src={item.image} alt="" />
          <img src={item.image} alt="" />
          <img src={item.image} alt="" />
          <img src={item.image} alt="" />
        </div>
        <div className="productDisplay-img">
          <img className='productDisplay-main-img' src={item.image} alt="" />
        </div>
      </div>
      <div className='productDisplay-right'>
        <h1>{item.name}</h1>
        <div className='productDisplay-right-star'>
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>


        </div>
        <div className="productDisplay-right-price">
          <div className="productDisplay-right-price-oldPrice">
            ${item.old_price}
          </div>
          <div className="productDisplay-right-price-newPrice">
            ${item.new_price}
          </div>
        </div>

        <div className="productDisplay-right-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod accusamus possimus iure corporis quo, accusantium fugit neque voluptates. Rerum architecto corporis temporibus illum similique eligendi iusto officia!
        </div>
        <div className="productDisplay-right-size">
          <h1>Select Size</h1>
          <div className="productDisplay-right-sizes">
            <div className="size">S</div>
            <div className="size">L</div>
            <div className="size">M</div>
            <div className="size">XL</div>
            <div className="size">XXL</div>
          </div>
        </div>

        <button onClick={()=>{addToCart(item.id);
        }}>ADD TO CART</button>
        <div className='productDisplay-right-category'>
          <p>Category : <span>Women, T-shirt, Crop Top</span></p>
          <p>Tags : <span>Modern,Latest</span></p>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay;
