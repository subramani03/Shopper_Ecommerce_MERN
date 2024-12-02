import React, { useEffect, useState } from 'react'
import Item from '../Item/Item';
import './NewCollection.css';


const NewCollection = () => {
    let [newProduct,setNewProduct] = useState([]);
    let fetchNewProduct=async ()=>{
        let data =await fetch('http://localhost:3000/newproducts/');
        let response = await data.json();
        console.log(response.products);
        setNewProduct(response.products);
      }
       useEffect(()=>{
        fetchNewProduct();
       },[]) 
    return (
        <div className='new-collection'>
            <div className='heading'>
                <h1>NEW COLLECTION</h1><hr />
            </div>
            <div className="new-collection-container">
                {newProduct.map((item, i) => (<Item data={item} key={i} />))}
            </div>

        </div>
    )
}

export default NewCollection
