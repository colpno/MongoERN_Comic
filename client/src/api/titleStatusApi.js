import axiosClient from "libs/axios/axiosClient";

const url = "/titleStatuses";

const titleStatusApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}`),

  add: (title) => axiosClient.post(url, title),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: ({ key, order }) =>
    axiosClient.get(`${url}?_sort=${key}&_order=${order}`),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (searchObj) => {
    const key = Object.keys(searchObj)[0];
    return axiosClient.get(`${url}?${key}=${searchObj[key]}`);
  },
};

export default titleStatusApi;
