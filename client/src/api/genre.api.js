import axiosClient from "./axiosClient";

const url = "/genres";

const genreApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOne: (id) => axiosClient.get(`${url}/${id}`),
};

export default genreApi;
