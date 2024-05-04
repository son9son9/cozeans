import "./App.css";
import { Suspense } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./page/home/Home";
import Shop from "./page/shop/Shop";
import Login from "./page/login/Login";
import Cart from "./page/cart/Cart";
import Details from "./page/details/Details";
import Checkout from "./page/checkout/Checkout";
import OrderResult from "./page/orderResult/OrderResult";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  const [cartData, setCartData] = useState(localStorage.getItem("my-cart"));

  // state와 localStorage에 데이터 할당하는 핸들러
  const setCartDataHandler = (data) => {
    setCartData(data);
    localStorage.setItem("my-cart", data);
  };

  // 페이지 이동 시 스크롤 맨위로 초기화
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<></>}>
      <Header cartData={cartData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop/" element={<Navigate replace to="/shop/1" />} />
        <Route path="/shop/:page" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart cartData={cartData} setCartData={setCartDataHandler} />} />
        <Route path="/details/:id" element={<Details cartData={cartData} setCartData={setCartDataHandler} />} />
        <Route path="/checkout" element={<Checkout cartData={cartData} setCartData={setCartDataHandler} />} />
        <Route path="/order-success" element={<OrderResult isSucceed={true} />} />
        <Route path="/order-fail" element={<OrderResult isSucceed={false} />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
