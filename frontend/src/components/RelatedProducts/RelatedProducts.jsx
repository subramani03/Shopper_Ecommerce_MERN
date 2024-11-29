import React from 'react'
import './RelatedProducts.css';
import data_product from "../Assets/data.js";
import Item from '../Item/Item';


const RelatedProducts = () => {
    return (
        <div className='RelatedProducts'>
            <div className='heading'>
                <h1>Realted products</h1>
                <hr />
            </div>
            <div className="RelatedProducts-item">
                {data_product.map((item, i) => (<Item data={item} key={i} />)
                )}
            </div>
        </div>
    )
}

export default RelatedProducts
