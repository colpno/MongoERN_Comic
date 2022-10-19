import axiosClient from "libs/axios/axiosClient";

const url = "/titles";

const titleApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getAllByUserID: (ID, params) =>
    axiosClient.get(`${url}?userId=${ID}`, { params }),

  getOneById: (id) =>
    axiosClient.get(`${url}/${id}?_expand=genre&_expand=titleStatus`),

  add: (title) => axiosClient.post(url, title),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?_sort=${key}&_order=${order}`, {
      params,
    }),

  sortByUserID: (ID, key, order, params) =>
    axiosClient.get(`${url}?userID=${ID}&_sort=${key}&_order=${order}`, {
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

export default titleApi;
