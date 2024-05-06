import "../../App.css";
import styles from "./Footer.module.scss";
import cozeansLogo from "../../assets/cozeans.svg";
import githubLogo from "../../assets/github.svg";
import { Link } from "react-router-dom";
import { rootPath } from "../../config";

const Footer = () => {
  return (
    <div className={`${styles.container} animate-after-render`}>
      <footer>
        <div className={styles.logo}>
          <Link to={rootPath}>
            <img src={cozeansLogo} width={120} alt="Cozeans Logo" />
          </Link>
          <p>
            Image Origins :<br />
            https://www.calvinklein.co.kr/ko/home/
            <br />
            https://hififnk.kr/
          </p>
          <p>COPYRIGHT © son9son9 ALL RIGHTS RESERVED.</p>
        </div>
        <div className={styles.contact}>
          <h3>Contact</h3>
          <p>dragonh0919@gmail.com</p>
          <a href="https://github.com/son9son9" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="Github Logo" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
