import "../../App.css";
import styles from "./Footer.module.scss";
import cozeansLogo from "../../assets/cozeans.svg";
import githubLogo from "../../assets/github.svg";

const Footer = () => {
  return (
    <div className={styles.container}>
      <footer className={styles.footer}>
        <div className={styles.logo}>
          <img src={cozeansLogo} width={120} alt="Cozeans Logo" />
          <p>COPYRIGHT © son9son9 ALL RIGHTS RESERVED.</p>
        </div>
        <div className={styles.contact}>
          <h3>Contact</h3>
          <p>dragonh0919@gmail.com</p>
          <img src={githubLogo} alt="Github Logo" />
        </div>
      </footer>
    </div>
  );
};

export default Footer;
