/* eslint-disable no-unused-vars */
import axiosClient from "libs/axios/axiosClient";

const url = "/titles";

const titleApi = {
  getAll: (params) => axiosClient.get(`${url}`, { params }),

  getAllByProperty: (property, value, params) =>
    axiosClient.get(`${url}?${property}_like=${value}`, {
      params,
    }),

  getOneByID: (id, property) => {
    const keyArray = Object.keys(property);
    const queryStr = keyArray.reduce((string, key, index) => {
      return index !== keyArray.length - 1
        ? `${string}${key}=${property[key]}&`
        : `${string}${key}=${property[key]}`;
    }, "");

    return axiosClient.get(`${url}/${id}?${queryStr}`, {
      withCredentials: true,
    });
  },

  add: (title, setProgress) =>
    axiosClient.post(`${url}/create`, title, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  update: (id, data, setProgress) =>
    axiosClient.put(`${url}/update/${id}`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  delete: (id, data, setProgress) =>
    axiosClient.delete(`${url}/delete/${id}`, {
      withCredentials: true,
      data: {
        data,
      },
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = Math.floor((loaded / total) * 100);
        setProgress(percentage);
      },
    }),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?sort=${key}&order=${order}`, {
      params,
    }),

  sortByUserID: (ID, key, order, params) =>
    axiosClient.get(`${url}?userId=${ID}&sort=${key}&order=${order}`, {
      params,
    }),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (key, value) => {
    return axiosClient.get(`${url}?${key}=${value}`);
  },
};

export default titleApi;
