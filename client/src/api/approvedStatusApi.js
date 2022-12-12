import axiosClient from "libs/axios/axiosClient";

const url = "/approved-statuses";

const approvedStatusApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOne: (id) => axiosClient.get(`${url}/${id}`),
};

export default approvedStatusApi;
