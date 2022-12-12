import axiosClient from "libs/axios/axiosClient";

const url = "/ticket-histories";

const ticketHistoryApi = {
  getAll: (params) => axiosClient.get(url, { params }),
};

export default ticketHistoryApi;
