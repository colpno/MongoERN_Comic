import axiosClient from "libs/axios/axiosClient";

const url = "/chapterReports";
const chapterReportApi = {
  getAll: (params) => axiosClient.get(url, { params }),
};

export default chapterReportApi;
