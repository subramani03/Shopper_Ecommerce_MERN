import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./components/Footer/Footer";
import { ShopContext } from "./Context/ShopContext";
import all_product from "./components/Assets/all_product";
import banner_mens from "./components/Assets/banner_mens.png";
import banner_women from "./components/Assets/banner_women.png";
import banner_kids from "./components/Assets/banner_kids.png";
import { useState } from "react";

function App() {
  let setDefautCart = () => {
    let cart = {};
    for (let index = 0; index <= all_product.length; index++) {
      cart[index] = 0;
    }
    return cart;
  };

  let [cartItem, setCartItem] = useState(setDefautCart());

  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItem);
  };

  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    console.log(cartItem);
  };

  const totalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItem += cartItem[item];
      }
    }
    return totalItem;
  };

  const totalCartPrice = () => {
    let totalPrice = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let cartProductPrice=all_product.find((product) => product.id === Number(item)).new_price;
        let quantity=cartItem[item];
        totalPrice += cartProductPrice *quantity ;
      }
    }
    return totalPrice;
  };
  const [menu, setMenu] = useState("shop");


  return (
    <div>
      <BrowserRouter>
        <ShopContext.Provider
          value={{
            all_product,
            cartItem,
            addToCart,
            removeFromCart,
            totalCartItem,
            totalCartPrice,
            menu,
            setMenu,
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route
              path="/men"
              element={<ShopCategory banner={banner_mens} category="men" />}
            />
            <Route
              path="/women"
              element={<ShopCategory banner={banner_women} category="women" />}
            />
            <Route
              path="/kid"
              element={<ShopCategory banner={banner_kids} category="kid" />}
            />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
        </ShopContext.Provider>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
