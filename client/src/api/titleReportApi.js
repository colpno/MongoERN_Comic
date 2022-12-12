import axiosClient from "libs/axios/axiosClient";

const url = "/titleReports";

const titleReportApi = {
  getAll: (params) => axiosClient.get(url, { params }),
};

export default titleReportApi;
