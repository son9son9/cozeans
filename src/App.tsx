import "./App.css";
import { Suspense, useState, useEffect } from "react";
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
import SignUp from "./page/signUp/SignUp";
// import FindAccount from "./page/findAccount/FindAccount";
import { rootPath } from "./config";

function App() {
  const { pathname } = useLocation();
  const [cartData, setCartData] = useState(localStorage.getItem("cozeans-my-cart"));
  const [loginSession, setLoginSession] = useState(sessionStorage.getItem("cozeans-login-session"));

  // state와 localStorage에 장바구니 데이터 업데이트
  const updateCartDataHandler = (data: any) => {
    setCartData(data);
    localStorage.setItem("cozeans-my-cart", data);
  };

  // sessionStorage에 로그인 세션 정보 업데이트
  const updateLoginHandler = (data: any) => {
    setLoginSession(data);
    sessionStorage.setItem("cozeans-login-session", data);
  };

  // 페이지 이동 시 스크롤 맨위로 초기화
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<></>}>
      <Header loginSession={loginSession} setLoginSession={updateLoginHandler} cartData={cartData} />
      <Routes>
        <Route path={`/`} element={<Navigate replace to={`${rootPath}`} />} />
        <Route path={`${rootPath}`} element={<Home />} />
        <Route path={`${rootPath}shop`} element={<Navigate replace to={`${rootPath}shop/1`} />} />
        <Route path={`${rootPath}shop/:page`} element={<Shop />} />
        <Route path={`${rootPath}login`} element={<Login loginSession={loginSession} setLoginSession={updateLoginHandler} />} />
        <Route path={`${rootPath}sign-up`} element={<SignUp />} />
        {/* <Route path={`${rootPath}find-account`} element={<FindAccount loginSession={loginSession} />} /> */}
        <Route path={`${rootPath}cart`} element={<Cart cartData={cartData} setCartData={updateCartDataHandler} loginSession={loginSession} />} />
        <Route path={`${rootPath}details/:id`} element={<Details cartData={cartData} setCartData={updateCartDataHandler} loginSession={loginSession} />} />
        <Route path={`${rootPath}checkout`} element={<Checkout cartData={cartData} setCartData={updateCartDataHandler} loginSession={loginSession} />} />
        <Route
          path={`${rootPath}order-success`}
          element={<OrderResult isSucceed={true} cartData={cartData} setCartData={updateCartDataHandler} loginSession={loginSession} />}
        />
        <Route path={`${rootPath}order-fail`} element={<OrderResult isSucceed={false} />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
