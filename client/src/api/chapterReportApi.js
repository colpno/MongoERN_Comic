import axiosClient from "libs/axios/axiosClient";

const url = "/chapterReports";
const chapterReportApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  add: (id) =>
    axiosClient.post(`${url}/create/${id}`, { withCredentials: true }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),
  filter: (filterObj, params) => {
    const keyArray = Object.keys(filterObj);
    const queryStr = keyArray.reduce((string, key, index) => {
      return index !== keyArray.length - 1
        ? `${string}${key}_like=${filterObj[key]}&`
        : `${string}${key}_like=${filterObj[key]}`;
    }, "");

    return axiosClient.get(`${url}?${queryStr}`, { params });
  },

  search: (searchObj, params) => {
    const keyArray = Object.keys(searchObj);
    const queryStr = keyArray.reduce((string, key, index) => {
      return index !== keyArray.length - 1
        ? `${string}${key}=${searchObj[key]}&`
        : `${string}${key}=${searchObj[key]}`;
    }, "");

    return axiosClient.get(`${url}?${queryStr}`, { params });
  },
};

export default chapterReportApi;
