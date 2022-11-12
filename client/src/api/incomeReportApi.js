import axiosClient from "libs/axios/axiosClient";

const url = "/incomeReports";
const incomeReportApi = {
  getAll: (params) =>
    axiosClient.get(url, {
      params,
    }),

  getOneByID: (id) => {
    return axiosClient.get(`${url}/${id}`);
  },

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
};

export default incomeReportApi;
