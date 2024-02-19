import "../../App.css";
import styles from "./Header.module.scss";
import cozeansLogo from "../../assets/cozeans.svg";

const Header = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
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
    </div>
  );
};

export default Header;
