import axiosClient from "libs/axios/axiosClient";

const url = "/point-transactions";

const pointHistoryApi = {
  getAll: (params) => axiosClient.get(url, { params }),
};

export default pointHistoryApi;
