import axiosClient from "libs/axios/axiosClient";

const url = "/genres";

const genreApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOneById: (id) => axiosClient.get(`${url}/${id}`),

  add: (title) => axiosClient.post(url, title),

  delete: (id) => axiosClient.get(`${url}/${id}`),

  sort: ({ key, order }) =>
    axiosClient.get(`${url}?_sort=${key}&_order=${order}`),

  filter: (filterObj) => {
    const key = Object.keys(filterObj)[0];
    return axiosClient.get(`${url}?${key}_like=${filterObj[key]}`);
  },

  search: (searchObj) => {
    const keys = Object.keys(searchObj);
    const queryStr = keys.map((key, index) =>
      index === 0 ? `${key}=${searchObj[key]}` : `&${key}=${searchObj[key]}`
    );
    return axiosClient.get(`${url}?${queryStr}`);
  },
};

export default genreApi;
