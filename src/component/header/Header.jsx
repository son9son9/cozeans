import "../../App.css";
import styles from "./Header.module.scss";
import cozeansLogo from "../../assets/cozeans.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const loginSession = props.loginSession && JSON.parse(props.loginSession);
  // 현재 세션 id와 일치하는 user의 장바구니 필터링 또는
  // 현제 세션 id와 user의 장바구니가 falsy 값을 때, 즉 비로그인(게스트)일 때 필터링
  const myCartArray =
    props.cartData && JSON.parse(props.cartData).filter((item) => item.user === loginSession.id || Boolean(item.user) === Boolean(loginSession.id));

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
              <Link to="/cart">CART&nbsp;&nbsp;{myCartArray && <span className={styles["item-quantity"]}>{myCartArray.length}</span>}</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
