import axiosClient from "libs/axios/axiosClient";

const url = "/coin-transactions";

const coinHistoryApi = {
  getAll: (params) =>
    axiosClient.get(`${url}?_expand=user&_expand=payMethod`, { params }),

  getAllByUserID: (userId, params) =>
    axiosClient.get(`${url}?userId=${userId}?_expand=user&_expand=payMethod`, {
      params,
    }),

  getOneByID: (id) =>
    axiosClient.get(`${url}/${id}?_expand=user&_expand=payMethod`),

  add: (coinHistory) => axiosClient.post(url, coinHistory),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: (userId, key, order, params) =>
    axiosClient.get(
      `${url}?userId=${userId}&_sort=${key}&_order=${order}&_expand=user&_expand=payMethod`,
      {
        params,
      }
    ),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(
      `${url}?${key}_like=${filterObj[key]}&_expand=user&_expand=payMethod`
    );
  },

  search: (key, value) => {
    return axiosClient.get(
      `${url}?${key}=${value}&_expand=user&_expand=payMethod`
    );
  },
};

export default coinHistoryApi;
