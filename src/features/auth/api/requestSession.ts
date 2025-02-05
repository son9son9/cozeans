import { SERVER_PATH } from "../../../config";
import { LoginSessionModel } from "../../../models/LoginSessionModel";

export const requestSession = async (loginSession: LoginSessionModel) => {
  return await fetch(`${SERVER_PATH}session-info?session-id=${loginSession.sessionId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      // skip ngrok warning
      "ngrok-skip-browser-warning": "69420",
    },
  }).then((res) => res.json());
};
