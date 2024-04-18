import "../../App.css";
import styles from "./Header.module.scss";
import cozeansLogo from "../../assets/cozeans.svg";
import { Link } from "react-router-dom";

const Header = (props) => {
  // props에 cartData가 실려왔다면 아이템의 개수 반환
  const itemQuantity = props.cartData && JSON.parse(props.cartData);

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
            <li>
              <Link to="/login">SIGN IN</Link>
            </li>
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
