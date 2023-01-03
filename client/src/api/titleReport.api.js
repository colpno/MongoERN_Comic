import axiosClient from "./axiosClient";

const url = "/title-reports";

const titleReportApi = {
  getAll: (params = {}) => {
    return axiosClient.get(url, { params, withCredentials: true });
  },
};

export default titleReportApi;
