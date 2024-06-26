import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetail from './components/ProductDetail/ProductDetail';
import axios from 'axios';
import { Offline } from "react-detect-offline";
import ShippingAddress from './components/ShippingAddress/ShippingAddress';

function App() {
  let [userToken , setUserToken] = useState("");
  useEffect(() => {
    if (localStorage.getItem("userToken") !== "") {
      setUserToken(localStorage.getItem("userToken"))
    }
  }, [])
  function checkOutSession(cartId,shippingAddress){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000
    `,{shippingAddress},{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }
  function addToCart(productId){
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }
  function getCartItems(){
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart",{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }
  function deleteCartItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }
  function updateCartItem(productId,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{headers:{token:localStorage.getItem("userToken")}})
    .then(res => res)
    .catch(err => err)
  }

  return (
    <div className="App">
      <Navbar userToken={userToken} setUserToken={setUserToken}/>
      <Offline><div className="offLine">Only shown offline (surprise!)</div></Offline>
      <div className="container py-4">
        <Routes>
          <Route exact path='/' element={<ProtectedRoute><Home addToCart={addToCart}/></ProtectedRoute>} />
          <Route path='/allorders' element={<ProtectedRoute><Home addToCart={addToCart}/></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cart updateCartItem={updateCartItem} getCartItems={getCartItems} deleteCartItem={deleteCartItem}/></ProtectedRoute>} />
          <Route path='/shippingaddress/:cartId' element={<ProtectedRoute><ShippingAddress checkOutSession={checkOutSession} /></ProtectedRoute>} />
          <Route path='/products' element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path='/productDetail/:id' element={<ProtectedRoute><ProductDetail addToCart={addToCart} /></ProtectedRoute>} />
          <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path='/brands' element={<ProtectedRoute><Brands /></ProtectedRoute>} />
          <Route path='/register' element={<Register setUserToken={setUserToken} />} />
          <Route path='/login' element={<Login setUserToken={setUserToken} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
