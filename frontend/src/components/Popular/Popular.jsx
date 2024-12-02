import React, { useEffect, useState } from 'react';
import "./Popular.css";
import Item from '../Item/Item';

const Popular = () => {

    let [popularProduct,setPopularProduct] = useState([]);

    let fetchPopularProduct=async ()=>{
        let data =await fetch('http://localhost:3000/popularproducts/');
        let response = await data.json();
        console.log(response.products);
        setPopularProduct(response.products);
      }
       useEffect(()=>{
        fetchPopularProduct();
       },[]) 

    return (
        <div className='popular'>
            <div className='heading'>
                <h1>POULAR IN WOMEN</h1><hr />
            </div>

            <div className="popular-items-container">
                {popularProduct.map((item, i) => (<Item data={item} key={i} />))}
            </div>

        </div>
    )
}

export default Popular
