import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./component/header/Header";
import Footer from "./component/footer/Footer";
import Home from "./page/home/Home";
import Shop from "./page/shop/Shop";
import Login from "./page/login/Login";
import Cart from "./page/cart/Cart";

function App() {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
