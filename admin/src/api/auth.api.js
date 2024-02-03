import bcrypt from "bcryptjs";
import axiosClient from "./axiosClient";

const url = "/auth";

const authApi = {
  verifyRegister: (token) => {
    return axiosClient.put(`${url}/register/verify/${token}`);
  },

  login: async (username, password) => {
    const saltRounds = 10;
    const myPlaintext = process.env.REACT_APP_LOGIN_TOKEN;
    const hash = await bcrypt.hash(myPlaintext, saltRounds);

    return axiosClient.post(
      `${url}/login`,
      { username, password, security_token: hash },
      { withCredentials: true }
    );
  },

  verifyLogin: (data) => {
    return axiosClient.post(`${url}/login/verify`, data, { withCredentials: true });
  },

  reSendOTP: (id, username, email) => {
    return axiosClient.post(
      `${url}/login/verify/re-send`,
      { id, username, email },
      { withCredentials: true }
    );
  },

  logout: () => {
    return axiosClient.get(`${url}/logout`, { withCredentials: true });
  },

  forgot: (username, email) => {
    return axiosClient.post(
      `${url}/forgot-password`,
      { username, email },
      { withCredentials: true }
    );
  },

  reset: (userId, password, token) => {
    return axiosClient.put(
      `${url}/reset-password/${token}`,
      { userId, password },
      { withCredentials: true }
    );
  },
};

export default authApi;
