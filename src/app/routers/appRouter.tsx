import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Header from "../../shared/header/Header";
import Footer from "../../shared/footer/Footer";
import { Home } from "../../pages/home";
import { Shop } from "../../pages/shop";
import { Login } from "../../pages/login";
import { Cart } from "../../pages/cart";
import { Details } from "../../pages/details";
import { Checkout } from "../../pages/checkout";
import { OrderResult } from "../../pages/orderResult";
import { SignUp } from "../../pages/signUp";
// import { FindAccount } from "./page/findAccount";
import { ROOT_PATH } from "../../config";
import { useEffect } from "react";

export const AppRouter = () => {
  const { pathname } = useLocation();

  // 페이지 이동 시 스크롤 맨위로 초기화
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <>
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
    </>
  );
};
