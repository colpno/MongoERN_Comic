import axiosClient from "./axiosClient";

const url = "/genres";

const genreApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOne: (id, params) => axiosClient.get(`${url}/${id}`, { params }),
};

export default genreApi;
