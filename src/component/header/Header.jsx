import "../../App.css";
import styles from "./Header.module.scss";
import cozeansLogo from "../../assets/cozeans.svg";
import { Link } from "react-router-dom";

const Header = () => {
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
              <Link to="/cart">CART</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
