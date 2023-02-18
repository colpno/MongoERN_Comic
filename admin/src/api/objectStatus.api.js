import axiosClient from "./axiosClient";

const url = "/object-statuses";

const approvedStatusApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOne: (id) => axiosClient.get(`${url}/${id}`),
};

export default approvedStatusApi;
