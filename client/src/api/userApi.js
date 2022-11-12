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

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
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
