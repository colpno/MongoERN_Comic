import axiosClient from "./axiosClient";

const url = "/auth";

const authApi = {
  verifyRegister: (token) => {
    return axiosClient.put(`${url}/register/verify/${token}`);
  },

  login: (username, password) => {
    return axiosClient.post(
      `${url}/login`,
      { username, password },
      { withCredentials: true }
    );
  },

  verifyLogin: (id, username, email, otp) => {
    return axiosClient.post(
      `${url}/login/verify`,
      { id, username, email, otp },
      { withCredentials: true }
    );
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
