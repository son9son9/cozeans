import "../../App.css";
import styles from "./Header.module.scss";
import cozeansLogo from "../../assets/cozeans.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = (props) => {
  const navigate = useNavigate();
  // props에 cartData가 실려왔다면 아이템의 개수 반환
  const itemQuantity = props.cartData && JSON.parse(props.cartData);
  const loginSession = props.loginSession && JSON.parse(props.loginSession);

  const logoutClickHandler = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      props.setLoginSession("");
      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  };

  return (
    <div className={`${styles.container} animate-after-render`}>
      <header className={styles.header}>
        <Link to="/">
          <img src={cozeansLogo} className={styles.logo} alt="Cozeans Logo" />
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/shop">NEW ARRIVALS</Link>
            </li>
            <li>
              <Link to="/shop">SHOP</Link>
            </li>
          </ul>
          <ul>
            {loginSession ? (
              <li onClick={logoutClickHandler} style={{ cursor: "pointer", fontWeight: "500" }}>
                {loginSession.name} 님
              </li>
            ) : (
              <li>
                <Link to="/login">SIGN IN</Link>
              </li>
            )}
            <li>
              <Link to="/cart">CART&nbsp;&nbsp;{itemQuantity && <span className={styles["item-quantity"]}>{itemQuantity.length}</span>}</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
