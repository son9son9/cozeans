import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginSessionModel } from "../../../models/LoginSessionModel";
import { useEffect } from "react";
import { ROOT_PATH } from "../../../config";

export const useBackWhenLogin = () => {
  const navigate = useNavigate();
  const loginSession: LoginSessionModel = useSelector((state: any) => state.loginSession.value);

  // 로그인 중이라면 alert 후 메인페이지로 돌아가기
  useEffect(() => {
    if (Object.keys(loginSession).length !== 0) {
      alert("이미 로그인 되어있습니다.");
      navigate(ROOT_PATH);
    }
  }, []);
};
