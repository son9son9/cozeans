import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import styles from "./Login.module.scss";
import { useState, useEffect } from "react";
import { ROOT_PATH, SERVER_PATH } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { LoginSessionModel } from "../../models/LoginSessionModel";
import { loginSessionActions } from "../../store/index";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSession: LoginSessionModel = useSelector((state: any) => state.loginSession.value);
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");

  const mutation = useMutation<Response, Error, { userId: string; password: string }>({
    mutationFn: async (reqLogin) => {
      return await fetch(`${SERVER_PATH}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqLogin),
      }).then((res) => res.json());
    },
    onSuccess: (data: any) => {
      if (data.success) {
        dispatch(loginSessionActions.login(data.sessionInfo));
        navigate(ROOT_PATH);
        // window.location.assign("/");
      } else if (data.isInvalid) {
        alert("계정 정보가 없습니다.");
      } else {
        alert("이미 로그인 되어있습니다.");
        navigate(ROOT_PATH);
      }
    },
    onError: (err: any) => {
      console.log("Login Error: ", err);
      alert("");
    },
  });

  const loginHandler = async () => {
    mutation.mutate({ userId: idInput, password: pwInput });
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
      navigate(ROOT_PATH);
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
            <Link to={`${ROOT_PATH}find-account`}>forgot password?</Link>
          </button> */}
          <button>
            <Link to={`${ROOT_PATH}sign-up`}>sign up</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
