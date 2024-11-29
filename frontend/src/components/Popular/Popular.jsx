import React from 'react';
import "./Popular.css";
import data_product from "../Assets/data";
import Item from '../Item/Item';

const Popular = () => {
    return (
        <div className='popular'>
            <div className='heading'>
                <h1>POULAR IN WOMEN</h1><hr />
            </div>

            <div className="popular-items-container">
                {data_product.map((item, i) => (<Item data={item} key={i} />))}
            </div>

        </div>
    )
}

export default Popular
