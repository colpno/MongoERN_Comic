import axiosClient from "libs/axios/axiosClient";

const url = "/incomeReports";

const incomeReportApi = {
  getAll: (params) => axiosClient.get(url, { params }),
};

export default incomeReportApi;
