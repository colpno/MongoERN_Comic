import axiosClient from "libs/axios/axiosClient";

const url = "/users";
const userApi = {
  getAll: (params) =>
    axiosClient.get(url, {
      params,
    }),

  getOneByID: (id) => {
    return axiosClient.get(`${url}/${id}`);
  },

  update: (id, data, setProgress) =>
    axiosClient.put(`${url}/update/${id}`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const progress = (loaded / total) * 100;
        setProgress(progress);
      },
    }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),

  sort: (propertyObj, key, order, params) => {
    const propertyKey = Object.keys(propertyObj)[0];
    if (propertyKey) {
      const queryStr = `${propertyKey}=${propertyObj[propertyKey]}&`;
      return axiosClient.get(`${url}?${queryStr}sort=${key}&order=${order}`, {
        params,
      });
    }

    return axiosClient.get(`${url}?sort=${key}&order=${order}`, {
      params,
    });
  },

  filter: (property, params) => {
    const keyArray = Object.keys(property);
    const queryStr = keyArray.reduce((string, key, index) => {
      return index !== keyArray.length - 1
        ? `${string}${key}_like=${property[key]}&`
        : `${string}${key}_like=${property[key]}`;
    }, "");

    return axiosClient.get(`${url}?${queryStr}`, { params });
  },

  search: (searchObj) => {
    const keyArray = Object.keys(searchObj);
    const queryStr = keyArray.reduce((string, key, index) => {
      return index !== keyArray.length - 1
        ? `${string}${key}=${searchObj[key]}&`
        : `${string}${key}=${searchObj[key]}`;
    }, "");

    return axiosClient.get(`${url}?${queryStr}`);
  },
};

export default userApi;