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
import banner_mens from "./components/Assets/banner_mens.png";
import banner_women from "./components/Assets/banner_women.png";
import banner_kids from "./components/Assets/banner_kids.png";
import { useEffect, useState } from "react";

function App() {
  const [all_product, setAllProducts] = useState([]);

  let fetchAllProduct = async () => {
    let data = await fetch("http://localhost:3000/allproducts/");
    let response = await data.json();
    console.log(response.products);
    setAllProducts(response.products);
  };
  let fetchCartdata = async () => {
    let Cartsdata = await fetch("http://localhost:3000/getcart/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    let cartResponse = await Cartsdata.json();
    setCartItem(cartResponse.cartdata);
    console.log(cartItem);
  };
  useEffect(() => {
    fetchAllProduct();
    if (localStorage.getItem("auth-token")) {
      fetchCartdata();
    }
  }, []);
  // useEffect(() => {
  //   fetchCartdata();
  // });

  let setDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
      cart[index] = 0;
    }
    return cart;
  };

  let [cartItem, setCartItem] = useState(setDefaultCart());
  console.log(cartItem);

  const addToCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItem);
    let data = await fetch("http://localhost:3000/addtocarts/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ itemId: itemId }),
    });
    let response = await data.json();
    console.log(response);
  };

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    console.log(cartItem);
    let data = await fetch("http://localhost:3000/removefromcarts/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ itemId: itemId }),
    });
    let response = await data.json();
    console.log(response);
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
        let cartProductPrice = all_product.find(
          (product) => product.id === Number(item)
        ).new_price;
        let quantity = cartItem[item];
        totalPrice += cartProductPrice * quantity;
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
