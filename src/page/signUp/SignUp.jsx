import { useState } from "react";
import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/modal/Modal";

const SignUp = () => {
  const navigate = useNavigate();
  const [idInput, setIdInput] = useState("");
  const [pwInput, setPwInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [pwCheckInput, setPwCheckInput] = useState("");
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(true);

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

    // 로컬스토리지 계정 정보 불러와서 JSON parsing
    let accountDatabase = localStorage.getItem("cozeans-accounts");
    accountDatabase && (accountDatabase = JSON.parse(accountDatabase));
    // id 중복 검사
    if (accountDatabase) {
      for (let i = 0; i < accountDatabase.length; i++) {
        if (accountDatabase[i].id === idInput) {
          alert("이미 동일한 아이디의 회원이 존재합니다.");
          return false;
        }
      }
    }

    // 계정 정보를 로컬스토리지에 추가
    const accountArray = [...(accountDatabase || ""), { name: nameInput, id: idInput, password: pwInput }];
    localStorage.setItem("cozeans-accounts", JSON.stringify(accountArray));
    toggleCompleteModal();
  };

  const toggleCompleteModal = () => {
    setIsCompleteModalOpen(!isCompleteModalOpen);
  };

  const completeModalButtonHandler = () => {
    navigate("/login");
  };

  return (
    <div className={`${styles.container} animate-after-render`}>
      <div className={styles.content}>
        <h2>SIGN UP</h2>
        <h3>Create account</h3>
        <label>
          Name
          <input type="text" onChange={(e) => setNameInput(e.currentTarget.value)} />
        </label>
        <label>
          ID
          <input type="text" onChange={(e) => setIdInput(e.currentTarget.value)} />
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
      <Modal toggleModal={toggleCompleteModal} isOpen={isCompleteModalOpen}>
        <h2>Congraturation !</h2>
        <p>You became our member !</p>
        <br />
        <button onClick={completeModalButtonHandler}>GO TO LOGIN</button>
      </Modal>
    </div>
  );
};

export default SignUp;
