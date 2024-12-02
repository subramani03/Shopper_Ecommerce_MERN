import React, { useState } from 'react'
import './AddProduct.css';
import upload_area from '../../assets/Admin_Assets/upload_area.svg';
const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [Products, setProducts] = useState({
    name: " ",
    image: "",
    category:"men",
    old_price: "",
    new_price: ""
  });


  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

  const HandleInputChange = (e) => {
    setProducts({ ...Products, [e.target.name]: e.target.value })
  }

  const setProductData = async (e) => {
    let product = Products;
    let formdata = new FormData();
    formdata.append('product', image);

    let data = await fetch('http://localhost:3000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formdata,
    })
    let response = await data.json();
    if (response.success) {
      product.image = response.image_url;
      console.log(product);
      let productData = await fetch('http://localhost:3000/addproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(product) ,
    })
    let productResponse = await productData.json();
    console.log(productResponse);
    }

  }




  return (
    <div className='AddProduct'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input onChange={HandleInputChange} value={Products.name} type="text" name='name' placeholder='Name' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input onChange={HandleInputChange} value={Products.new_price} type="text" name='new_price' placeholder='Price' />
        </div>
        <div className="addproduct-itemfield">
          <p>Old Price</p>
          <input onChange={HandleInputChange} value={Products.old_price} type="text" name='old_price' placeholder='Old Price' />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" onChange={HandleInputChange} value={Products.category}  >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Upload Product Image</p>
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="file uploading icon" /></label>
        <input onChange={handleImageChange} type="file" id='file-input' hidden />
      </div>
      <button onClick={setProductData}>Add</button>
    </div>
  )
}

export default AddProduct
