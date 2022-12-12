import axiosClient from "libs/axios/axiosClient";

const url = "/reading-histories";

const readingHistoriesApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  add: (data) =>
    axiosClient.post(`${url}/create`, data, { withCredentials: true }),
};

export default readingHistoriesApi;
