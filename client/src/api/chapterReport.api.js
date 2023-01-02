import axiosClient from "./axiosClient";

const url = "/chapter-reports";

const chapterReportApi = {
  getAll: (params = {}) => {
    return axiosClient.get(url, { params, withCredentials: true });
  },
};

export default chapterReportApi;
