import React from 'react'
import new_collections from "../Assets/new_collections";
import Item from '../Item/Item';
import './NewCollection.css';


const NewCollection = () => {
    return (
        <div className='new-collection'>
            <div className='heading'>
                <h1>NEW COLLECTION</h1><hr />
            </div>

            <div className="new-collection-container">
                {new_collections.map((item, i) => (<Item data={item} key={i} />))}
            </div>

        </div>
    )
}

export default NewCollection
