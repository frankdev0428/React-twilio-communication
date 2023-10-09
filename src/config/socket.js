import socketIO from "socket.io-client";
import { getToken } from "utils/helpers/helpers";

export const getSocket = () => {
  const token = getToken(); // get jwt token from local storage or cookie
  if (token) {
    return socketIO.connect(process.env.REACT_APP_WEBSOCKET_URL, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      },
      query: { token }
    });
  }
};