import "../../App.css";
import styles from "./Header.module.scss";
import cozeansLogo from "../../assets/cozeans.svg";
import { Link, useNavigate } from "react-router-dom";
import { rootPath } from "../../config";
import { ItemModel } from "../../models/ItemModel";
import { useDispatch, useSelector } from "react-redux";
import { LoginSessionModel } from "../../models/LoginSessionModel";
import { loginSessionActions } from "../../store";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSession: LoginSessionModel = useSelector((state: any) => state.loginSession.value);
  /* 현재 세션 id와 일치하는 user의 장바구니 필터링 또는
  현제 세션 id와 user의 장바구니가 falsy 값을 때, 즉 비로그인(게스트)일 때 필터링 */
  // 장바구니 데이터 불러오기
  const cart = useSelector((state: any) => state.cart.value);
  const [myCart, setMyCart] = useState([]);
  // store의 cart 변경이 일어날 때마다 myCart 업데이트
  useEffect(() => {
    setMyCart(cart.filter((item: ItemModel) => item.user === loginSession?.id || Boolean(item.user) === Boolean(loginSession?.id)));
  }, [cart, loginSession]);

  const logoutClickHandler = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      dispatch(loginSessionActions.logout());
      alert("로그아웃 되었습니다.");
      navigate(`${rootPath}`);
      // window.location.reload();
    }
  };

  return (
    <div className={`${styles.container} animate-after-render`}>
      <header className={styles.header}>
        <Link to={rootPath}>
          <img src={cozeansLogo} className={styles.logo} alt="Cozeans Logo" />
        </Link>
        <nav>
          <ul>
            <li>
              <Link to={rootPath}>HOME</Link>
            </li>
            <li>
              <Link to={`${rootPath}shop`}>NEW ARRIVALS</Link>
            </li>
            <li>
              <Link to={`${rootPath}shop`}>SHOP</Link>
            </li>
          </ul>
          <ul>
            {Object.keys(loginSession).length !== 0 ? (
              <li onClick={logoutClickHandler} style={{ cursor: "pointer", fontWeight: "500" }}>
                {loginSession.name} 님
              </li>
            ) : (
              <li>
                <Link to={`${rootPath}login`}>SIGN IN</Link>
              </li>
            )}
            <li>
              <Link to={`${rootPath}cart`}>CART&nbsp;&nbsp;{myCart.length > 0 && <span className={styles["item-quantity"]}>{myCart.length}</span>}</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
