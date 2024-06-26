import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import styles from "./Login.module.scss";
import { useState, useEffect } from "react";
import { rootPath } from "../../config";
import { AccountModel } from "../../models/AccountModel";
import { useDispatch, useSelector } from "react-redux";
import { LoginSessionModel } from "../../models/LoginSessionModel";
import { loginSessionActions } from "../../store/index";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accounts: AccountModel[] = useSelector((state: any) => state.accountInfo.value);
  const loginSession: LoginSessionModel = useSelector((state: any) => state.loginSession.value);
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");

  const loginHandler = () => {
    // DB에 로그인하려는 계정 정보가 있는지 검사
    if (accounts.length > 0) {
      for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id === idInput && accounts[i].password === pwInput) {
          // 일치하는 계정 있을 시 session 업데이트하고 로그인 로직 실행
          const inputedAccount: LoginSessionModel = { id: idInput, name: accounts[i].name };
          dispatch(loginSessionActions.login(inputedAccount));
          navigate(rootPath);
          return;
        } else {
          alert("로그인 정보가 일치하지 않습니다. 다시 입력해주세요.");
        }
      }
    } else {
      alert("로그인 정보가 존재하지 않습니다. 회원가입 후 다시 진행해주세요.");
    }
  };

  const keyPressHandler = (e: any) => {
    if (e.keyCode === 13) {
      loginHandler();
    }
  };

  // 로그인 중이라면 alert 후 메인페이지로 돌아가기
  useEffect(() => {
    if (Object.keys(loginSession).length !== 0) {
      alert("이미 로그인 되어있습니다.");
      navigate(rootPath);
    }
  }, []);

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
            <Link to={`${rootPath}find-account`}>forgot password?</Link>
          </button> */}
          <button>
            <Link to={`${rootPath}sign-up`}>sign up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
