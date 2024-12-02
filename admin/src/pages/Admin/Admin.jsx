import React from 'react'
import './Admin.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import AddProduct from '../../components/AddProduct/AddProduct';
import { Route, Routes } from 'react-router-dom';
import ListProducts from '../../components/ListProducts/ListProducts';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/allproducts' element={<ListProducts/>}/>
      </Routes>

    </div>
  )
}

export default Admin
