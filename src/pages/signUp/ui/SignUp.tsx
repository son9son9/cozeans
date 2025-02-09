import { useEffect, useState } from "react";
import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../../../shared/modal/Modal";
import { ROOT_PATH } from "../../../config";
import { useSelector } from "react-redux";
import { LoginSessionModel } from "../../../models/LoginSessionModel";
import { IAccount } from "../model/account";
import { useSignup } from "../model/useSignup";

export const SignUp = () => {
  const loginSession: LoginSessionModel = useSelector((state: any) => state.loginSession.value);
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [pwCheckInput, setPwCheckInput] = useState("");

  const { signup, modalState, setModalState } = useSignup();

  useEffect(() => {
    if (Object.keys(loginSession).length !== 0) {
      alert("이미 로그인 상태입니다.");
      navigate(`${ROOT_PATH}`);
    }
  }, []);

  const signUpHandler = () => {
    // input 입력 여부 검사
    if (!nameInput) {
      alert("이름을 입력해주세요.");
      return false;
    }
    if (!idInput) {
      alert("ID를 입력해주세요.");
      return false;
    }
    if (!pwInput) {
      alert("비밀번호를 입력해주세요");
      return false;
    }
    if (!pwCheckInput) {
      alert("비밀번호 확인을 입력해주세요.");
      return false;
    }
    if (pwInput !== pwCheckInput) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    // 서버에 계정 추가
    signup.mutate({ userName: nameInput, userId: idInput, password: pwInput } as IAccount);
  };

  const completeModalButtonHandler = () => {
    navigate(`${ROOT_PATH}login`);
  };

  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles.content}>
        <h2>SIGN UP</h2>
        <h3>Create account</h3>
        <label>
          ID
          <input type="text" onChange={(e) => setIdInput(e.currentTarget.value)} />
        </label>
        <label>
          Name
          <input type="text" onChange={(e) => setNameInput(e.currentTarget.value)} />
        </label>
        <label>
          Password
          <input type="password" onChange={(e) => setPwInput(e.currentTarget.value)} />
        </label>
        <label>
          Password
          <br />
          Check
          <input type="password" onChange={(e) => setPwCheckInput(e.currentTarget.value)} placeholder="Insert Password again" />
        </label>
        <button className={styles.signup} onClick={signUpHandler}>
          SIGN UP
        </button>
      </div>
      <Modal toggleModal={setModalState} isOpen={modalState}>
        <h2>Congraturation !</h2>
        <p>You just became our member !</p>
        <br />
        <button onClick={completeModalButtonHandler}>GO TO LOGIN</button>
      </Modal>
    </div>
  );
};
