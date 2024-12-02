import React, { useEffect, useState } from 'react'
import './ListProducts.css'
import cross_icon from "../../assets/Admin_Assets/cross_icon.png";

const ListProducts = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {

    let productsData = await fetch('http://localhost:3000/allproducts/');
    let productResponse = await productsData.json();
    setAllProducts(productResponse.products);
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  const removeProduct=async (id)=>{
    let removeProductData=await fetch('http://localhost:3000/removeproducts',{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id}),
    });
    let removeProductResponse = await removeProductData.json();
    if(removeProductResponse.success){
      fetchProducts();
      alert(removeProductResponse.message);
    }
  }



  return (
    <div className='ListProducts'>
      <h1>All products List</h1>
      <div className="ListProducts-format-main headings">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="ListProducts-allproduct">
        <hr />
        {allProducts.map((product, index) => {
          return <>
           <div key={index} className='ListProducts-format-main ListProducts-format' >
            <img src={product.image} alt="product image" className='ListProducts-productImage' />
            <p>{product.name}</p>
            <p>{product.new_price}</p>
            <p>{product.old_price}</p>
            <p>{product.category}</p>
            <img src={cross_icon} onClick={()=>{removeProduct(product.id)}} className='remove-product-icon' alt="cross icon" />
          </div>
          <hr/>
          </>
        })
        }
      </div>
    </div>
  )
}

export default ListProducts
