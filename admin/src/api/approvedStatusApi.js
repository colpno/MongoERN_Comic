import axiosClient from "libs/axios/axiosClient";

const url = "/approved-statuses";

const approvedStatusApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}`),

  add: (status) =>
    axiosClient.post(`${url}/create`, status, { withCredentials: true }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),

  sort: ({ key, order }) =>
    axiosClient.get(`${url}?sort=${key}&order=${order}`),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (searchObj) => {
    const key = Object.keys(searchObj)[0];
    return axiosClient.get(`${url}?${key}=${searchObj[key]}`);
  },
};

export default approvedStatusApi;
