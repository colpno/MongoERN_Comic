import axiosClient from "libs/axios/axiosClient";

const url = "/auth";
const authApi = {
  logout: () => {
    return axiosClient.get(`${url}/logout`, { withCredentials: "include" });
  },

  register: (user) => axiosClient.post(`${url}/register`, user),

  login: (username, password) => {
    return axiosClient.post(
      `${url}/login`,
      { username, password },
      { withCredentials: true }
    );
  },

  forgot: (info) => {
    return axiosClient.post(`${url}/forgot-password`, info);
  },

  reset: (info) => {
    return axiosClient.put(`${url}/reset-password/${info.token}`, info);
  },
};

export default authApi;
