import axiosClient from "libs/axios/axiosClient";

const url = "/point-transactions";

const pointHistoryApi = {
  getAll: (userId, params) =>
    axiosClient.get(`${url}?userId=${userId}`, { params }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}`),

  add: (coinHistory) => axiosClient.post(url, coinHistory),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: (userId, key, order, params) =>
    axiosClient.get(`${url}?userId=${userId}&_sort=${key}&_order=${order}`, {
      params,
    }),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (key, value) => {
    return axiosClient.get(`${url}?${key}=${value}`);
  },
};

export default pointHistoryApi;
