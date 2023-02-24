import axiosClient from "./axiosClient";

const url = "/income-reports";

const incomeApi = {
  getAll: (params = {}) => {
    return axiosClient.get(url, { params, withCredentials: true });
  },
};

export default incomeApi;
