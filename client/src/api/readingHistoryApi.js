import axiosClient from "libs/axios/axiosClient";

const url = "/reading-histories";

const readingHistoriesApi = {
  getAll: (userId, params) =>
    axiosClient.get(`${url}?userId=${userId}`, { params }),

  add: (history) =>
    axiosClient.post(`${url}/create`, history, { withCredentials: true }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),

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

export default readingHistoriesApi;
