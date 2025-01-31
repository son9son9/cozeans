import { SERVER_PATH } from "../../../config";
import { ILoginRequest } from "./types";

export const loginApi = async (reqLogin: ILoginRequest) => {
  return await fetch(`${SERVER_PATH}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqLogin),
  }).then((res) => res.json());
};
