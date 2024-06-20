import "./App.css";
import { Suspense, useEffect } from "react";
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

  // 페이지 이동 시 스크롤 맨위로 초기화
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <Suspense fallback={<></>}>
      <Header />
      <Routes>
        <Route path={`/`} element={<Navigate replace to={`${rootPath}`} />} />
        <Route path={`${rootPath}`} element={<Home />} />
        <Route path={`${rootPath}shop`} element={<Navigate replace to={`${rootPath}shop/1`} />} />
        <Route path={`${rootPath}shop/:page`} element={<Shop />} />
        <Route path={`${rootPath}login`} element={<Login />} />
        <Route path={`${rootPath}sign-up`} element={<SignUp />} />
        {/* <Route path={`${rootPath}find-account`} element={<FindAccount />} /> */}
        <Route path={`${rootPath}cart`} element={<Cart />} />
        <Route path={`${rootPath}details/:id`} element={<Details />} />
        <Route path={`${rootPath}checkout`} element={<Checkout />} />
        <Route path={`${rootPath}order-success`} element={<OrderResult isSucceed={true} />} />
        <Route path={`${rootPath}order-fail`} element={<OrderResult isSucceed={false} />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}

export default App;
