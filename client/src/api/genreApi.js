import axiosClient from "libs/axios/axiosClient";

const url = "/genres";

const genreApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOneByID: (id) => axiosClient.get(`${url}/${id}`),

  add: (genre) =>
    axiosClient.post(`${url}/create`, genre, { withCredentials: true }),

  update: (id, genre) =>
    axiosClient.put(`${url}/update/${id}`, genre, { withCredentials: true }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),

  sort: (key, order, params) =>
    axiosClient.get(`${url}?sort=${key}&order=${order}`, { params }),

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
