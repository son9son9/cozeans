import "../../App.css";
import styles from "./Header.module.scss";
// import { ReactComponent as Cozeans } from "../../assets/cozeans.svg";
import cozeansLogo from "../../assets/cozeans.svg";

const Header = () => {
  return (
    <header className={styles.Header}>
      <img src={cozeansLogo} className={styles.logo} alt="Cozeans Logo" />
      <nav>
        <ul>
          <li>HOME</li>
          <li>NEW ARRIVALS</li>
          <li>SHOP</li>
        </ul>
        <ul>
          <li>SIGN IN</li>
          <li>CART</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
