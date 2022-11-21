import axiosClient from "libs/axios/axiosClient";

const url = "/title-genres";

const titleGenreApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getAllByProperty: (prop) => {
    const keys = Object.keys(prop);
    const queryStr = keys.map((key, index) =>
      index === 0 ? `${key}=${prop[key]}` : `&${key}=${prop[key]}`
    );
    return axiosClient.get(`${url}?${queryStr}`);
  },

  add: (titleGenre) =>
    axiosClient.post(`${url}/create`, titleGenre, { withCredentials: true }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),

  sort: ({ key, order }) =>
    axiosClient.get(`${url}?sort=${key}&order=${order}`),

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

export default titleGenreApi;
