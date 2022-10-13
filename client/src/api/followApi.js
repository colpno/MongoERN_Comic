import axiosClient from "libs/axios/axiosClient";

const url = "/follows";

const followApi = {
  getAll: (userId, params) =>
    axiosClient.get(`${url}?userId=${userId}&_expand=title`, { params }),

  add: (title) => axiosClient.post(url, title),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?_sort=${key}&_order=${order}`, { params }),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (key, value) => {
    return axiosClient.get(`${url}?${key}=${value}`);
  },
};

export default followApi;
