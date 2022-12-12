import axiosClient from "libs/axios/axiosClient";

const url = "/title-genres";

const titleGenreApi = {
  getAll: (params) => axiosClient.get(url, { params }),
};

export default titleGenreApi;
