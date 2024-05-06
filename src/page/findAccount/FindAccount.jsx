import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FindAccount = (props) => {
  const navigate = useNavigate();
  const loginSession = props.loginSession && JSON.parse(props.loginSession);

  useEffect(() => {
    if (loginSession) {
      alert("로그아웃 후 다시 접근해주세요.");
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <h2>Find Account</h2>
    </div>
  );
};

export default FindAccount;
