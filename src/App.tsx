import "./App.css";
import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./page/home/Home";
import Shop from "./page/shop/Shop";
import Login from "./page/login/Login";
import Cart from "./page/cart/Cart";
import Details from "./page/details/Details";
import Checkout from "./page/checkout/Checkout";
import OrderResult from "./page/orderResult/OrderResult";
import SignUp from "./page/signUp/SignUp";
// import FindAccount from "./page/findAccount/FindAccount";
import { ROOT_PATH } from "./config";

function App() {
  const { pathname } = useLocation();

  // 페이지 이동 시 스크롤 맨위로 초기화
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<></>}>
      <Header />
      <Routes>
        <Route path={`/`} element={<Navigate replace to={`${ROOT_PATH}`} />} />
        <Route path={`${ROOT_PATH}`} element={<Home />} />
        <Route path={`${ROOT_PATH}shop`} element={<Navigate replace to={`${ROOT_PATH}shop/1`} />} />
        <Route path={`${ROOT_PATH}shop/:page`} element={<Shop />} />
        <Route path={`${ROOT_PATH}login`} element={<Login />} />
        <Route path={`${ROOT_PATH}sign-up`} element={<SignUp />} />
        {/* <Route path={`${ROOT_PATH}find-account`} element={<FindAccount />} /> */}
        <Route path={`${ROOT_PATH}cart`} element={<Cart />} />
        <Route path={`${ROOT_PATH}details/:id`} element={<Details />} />
        <Route path={`${ROOT_PATH}checkout`} element={<Checkout />} />
        <Route path={`${ROOT_PATH}order-success`} element={<OrderResult isSucceed={true} />} />
        <Route path={`${ROOT_PATH}order-fail`} element={<OrderResult isSucceed={false} />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
