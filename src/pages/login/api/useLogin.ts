import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "./loginApi";
import { ROOT_PATH } from "../../../config";
import { loginSessionActions } from "../../../entities/session";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginApi,
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
    },
  });
};
