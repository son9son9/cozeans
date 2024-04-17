import "../../App.css";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles["login-box"]}>
        <h2>SIGN IN</h2>
        <input type="text" placeholder="ID"></input>
        <input type="password" placeholder="PASSWORD"></input>
        <button className={styles.signin}>SIGN IN</button>
        <div className={styles["support-box"]}>
          <button>forgot password?</button>
          <button>sign up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
