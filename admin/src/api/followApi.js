import axiosClient from "libs/axios/axiosClient";

const url = "/follows";

const followApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getAllByUserID: (userId, params) =>
    axiosClient.get(`${url}?userId=${userId}`, {
      params,
      withCredentials: true,
    }),

  add: (follow) =>
    axiosClient.post(`${url}/create`, follow, { withCredentials: true }),

  delete: (titleId) =>
    axiosClient.delete(`${url}/delete/${titleId}`, { withCredentials: true }),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?sort=${key}&order=${order}`, { params }),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (key, value) => {
    return axiosClient.get(`${url}?${key}=${value}`);
  },
};

export default followApi;
