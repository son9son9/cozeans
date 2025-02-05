import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { useState } from "react";
import { ROOT_PATH } from "../../../config";
import caution from "../../../shared/assets/caution.png";
import { useLogin } from "../api/useLogin";
import { useBackWhenLogin } from "../../../features/backWhenLogin";

export const Login = () => {
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const login = useLogin();

  useBackWhenLogin();

  const loginHandler = async () => {
    login.mutate({ userId: idInput, password: pwInput });
  };

  const keyPressHandler = (e: any) => {
    if (e.keyCode === 13) {
      loginHandler();
    }
  };

  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles["login-box"]}>
        <h2>SIGN IN</h2>
        <input type="text" onChange={(e) => setIdInput(e.currentTarget.value)} onKeyDown={keyPressHandler} placeholder="ID"></input>
        <input type="password" onChange={(e) => setPwInput(e.currentTarget.value)} onKeyDown={keyPressHandler} placeholder="PASSWORD"></input>
        <button className={styles.signin} onClick={loginHandler}>
          SIGN IN
        </button>
        <div className={styles["support-box"]}>
          {/* <button>
            <Link to={`${ROOT_PATH}find-account`}>forgot password?</Link>
          </button> */}
          <button>
            <Link to={`${ROOT_PATH}sign-up`}>sign up</Link>
          </button>
        </div>
      </div>
      <div className={styles["test-guide-box"]}>
        <div>
          <img src={caution} alt="caution" width={24} />
          테스트 계정 로그인 안내
        </div>
        <p>
          ID : test
          <br />
          PW : 1111
        </p>
      </div>
    </div>
  );
};
