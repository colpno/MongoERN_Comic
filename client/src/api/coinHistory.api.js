import axiosClient from "./axiosClient";

const url = "/coin-transactions";

const coinHistoryApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),
};

export default coinHistoryApi;
