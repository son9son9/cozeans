import { SERVER_PATH } from "../../../config";
import { IAccount } from "../model/account";

export const requestSignup = async (req: IAccount) => {
  return await fetch(`${SERVER_PATH}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  }).then((res) => res.json());
};
