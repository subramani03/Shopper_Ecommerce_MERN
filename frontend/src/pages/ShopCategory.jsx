import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../components/Assets/dropdown_icon.png';
import Item from '../components/Item/Item';
import './CSS/ShopCategory.css'
//render shoping category (mens,women,kids)
const ShopCategory = (props) => {

  const { banner, category } = props;
  const { all_product } = useContext(ShopContext);
  return (
    
    <div className='shopCategory'>
      <img className='shopCategory-banner' src={banner} alt="" />
      <div className="ShopCategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopCategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopCategory-products">
        {all_product.map((item, i) => {
          return category === item.category ? (<Item data={item} key={i} />) :
            null;
        }
        )}
      </div>

    </div>
  )
}

export default ShopCategory
