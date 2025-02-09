import { useQuery } from "@tanstack/react-query";
import { LoginSessionModel } from "../../../models/LoginSessionModel";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginSessionActions } from "../../../entities/session";
import { requestSession } from "../api/requestSession";

export const useAuth = () => {
  const loginSession: LoginSessionModel = useSelector((state: any) => state.loginSession.value);
  const dispatch = useDispatch();

  const sessionCheck = useQuery({
    queryKey: ["session"],
    queryFn: () => requestSession(loginSession),
    retry: false,
    enabled: false,
  });
  // 메인 페이지에서 현재 로그인된 세션 체크,
  // 비로그인 상태 시 persist 상태 로그아웃으로 변경
  useEffect(() => {
    sessionCheck.refetch().then((res) => {
      if (res.data) {
        if (res.data.success === false) {
          dispatch(loginSessionActions.logout());
        }
      }
    });
  }, [sessionCheck.data]);
};
