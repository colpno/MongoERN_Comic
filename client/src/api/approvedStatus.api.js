import axiosClient from "./axiosClient";

const url = "/approved-statuses";

const approvedStatusApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOne: (id, params) => axiosClient.get(`${url}/${id}`, { params }),
};

export default approvedStatusApi;
