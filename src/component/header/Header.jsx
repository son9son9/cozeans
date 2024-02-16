import "../../App.css";
import styles from "./Header.module.scss";
// import { ReactComponent as Cozeans } from "../../assets/cozeans.svg";
import { ReactComponent as Vite } from "/public/vite.svg";

const Header = () => {
  return (
    <header className={styles.Header}>
      <nav>
        <ul>
          <li>HOME</li>
          <li>NEW ARRIVALS</li>
          <li>SHOP</li>
        </ul>
      </nav>
      {/* <Cozeans /> */}
      <Vite />
      <ul>
        <li>SIGN IN</li>
        <li>CART</li>
      </ul>
    </header>
  );
};

export default Header;
