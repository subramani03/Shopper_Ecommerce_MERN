import React, { useContext } from 'react'
import "./CardItem.css"
import { ShopContext } from '../../Context/ShopContext'
import cart_cross_icon from '../Assets/cart_cross_icon.png'

const CardItem = () => {

    const { all_product, cartItem, removeFromCart, totalCartPrice } = useContext(ShopContext);
    console.log(totalCartPrice());
    const valuesCartItemArray = Object.values(cartItem);
    const filterValuesCartItemArray= valuesCartItemArray.filter((val)=>val>0);
    console.log(filterValuesCartItemArray);
    return filterValuesCartItemArray.length > 0 ?(
        <div className='CartItem'>
            <div className="CartItem-format-main">
                <p>Products</p>
                <p className='Cartitem-product-title'>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {
                all_product.map((item) => {
                    if (cartItem[item.id] > 0) {
                        return (
                            <div>
                                <div className="CartItem-format">
                                    <img src={item.image} alt="" className='Carticon-product-icon' />
                                    <p className='Cartitem-product-title-value'>{item.name}</p>
                                    <p>${item.new_price}</p>
                                    <button className='CartItem-quantity'>{cartItem[item.id]}</button>
                                    <p className='CartItem-total'>${item.new_price * cartItem[item.id]}</p>
                                    <img src={cart_cross_icon} className='remove-cart-icon' onClick={() => { removeFromCart(item.id) }} alt="" />
                                </div>
                                <hr />
                            </div>
                        )
                    }

                    return null;
                })
            }
            <div className="cartItem-carttotal">
                <div className="cartItem-carttotal-left">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className='cartItem-total'>
                            <p>subtotal</p>
                            <p>${totalCartPrice()}</p>
                        </div>
                        <hr />
                        <div className='cartItem-total'>
                            <p>Shipping free</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className='cartItem-total finaltotal'>
                            <p>Total</p>
                            <p>${totalCartPrice()}</p>
                        </div>
                        <button>PROCEED TO CHECKOUT</button>
                    </div>
                </div>

                <div className="cartItem-total-right">
                    <p>If you have a promo code enter it here</p>
                    <div>
                        <input type="text" placeholder=' promo code' />
                        <button>Submit</button>
                    </div>

                </div>

            </div>
        </div>) : (
        <div>
            <p className='CartItem-empty-cart'>Empty cart</p>
        </div>
    )



}

export default CardItem
