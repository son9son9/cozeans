import { SERVER_PATH } from "../../../config";

export const requestItems = async () => {
  return await fetch(`${SERVER_PATH}items`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      // skip ngrok warning
      "ngrok-skip-browser-warning": "69420",
    },
  }).then((res) => res.json());
};
