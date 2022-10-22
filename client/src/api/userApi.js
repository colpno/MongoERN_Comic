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

  add: (user) => axiosClient.post(url, user),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: (propertyObj, key, order, params) => {
    const propertyKey = Object.keys(propertyObj)[0];
    if (propertyKey) {
      const queryStr = `${propertyKey}=${propertyObj[propertyKey]}&`;
      return axiosClient.get(`${url}?${queryStr}_sort=${key}&_order=${order}`, {
        params,
      });
    }

    return axiosClient.get(`${url}?_sort=${key}&_order=${order}`, {
      params,
    });
  },

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (searchObj) => {
    const key = Object.keys(searchObj)[0];
    return axiosClient.get(`${url}?${key}=${searchObj[key]}`);
  },
};

export default userApi;
