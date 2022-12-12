import axiosClient from "libs/axios/axiosClient";

const url = "/follows";

const followApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  add: (data) =>
    axiosClient.post(`${url}/create`, data, { withCredentials: true }),

  delete: (titleId) =>
    axiosClient.delete(`${url}/delete/${titleId}`, { withCredentials: true }),
};

export default followApi;
