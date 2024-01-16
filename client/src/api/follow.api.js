import axiosClient from "./axiosClient";

const url = "/follows";

const followApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),

  add: (titleId) => {
    return axiosClient.post(`${url}/create`, { titleId }, { withCredentials: true });
  },

  delete: (params) => {
    return axiosClient.delete(`${url}/delete`, {
      params,
      withCredentials: true,
    });
  },
};

export default followApi;
