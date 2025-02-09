import { useMutation } from "@tanstack/react-query";
import { IAccount } from "./account";
import { requestSignup } from "../api/requestSignup";
import { useState } from "react";

export const useSignup = () => {
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const toggleCompleteModal = () => {
    setIsCompleteModalOpen(!isCompleteModalOpen);
  };

  return {
    signup: useMutation<Response, Error, IAccount>({
      mutationFn: requestSignup,
      onSuccess: (data: any) => {
        if (data.success) {
          toggleCompleteModal();
        } else {
          alert("이미 존재하는 ID입니다.");
        }
      },
      retry: false,
    }),
    modalState: isCompleteModalOpen,
    setModalState: toggleCompleteModal,
  };
};
