import axiosClient from "libs/axios/axiosClient";

const url = "/auth";
const authApi = {
  logout: () => {
    return axiosClient.get(`${url}/logout`, { withCredentials: "include" });
  },

  register: (data) => axiosClient.post(`${url}/register`, data),

  verifyRegister: (token) => axiosClient.post(`${url}/register/verify`, token),

  login: (username, password) => {
    return axiosClient.post(
      `${url}/login`,
      { username, password },
      { withCredentials: true }
    );
  },

  verifyOTP: (data) =>
    axiosClient.post(`${url}/login/verify`, data, { withCredentials: true }),

  reSendOTP: () =>
    axiosClient.post(
      `${url}/login/verify/re-send`,
      {},
      { withCredentials: true }
    ),

  forgot: (info) => {
    return axiosClient.post(`${url}/forgot-password`, info, {
      withCredentials: true,
    });
  },

  reset: (token, password) => {
    return axiosClient.put(
      `${url}/reset-password/${token}`,
      { password },
      { withCredentials: true }
    );
  },
};

export default authApi;
