import axiosClient from "libs/axios/axiosClient";

const url = "/chapter-images";

const chapterImageApi = {
  getAll: (params) => axiosClient.get(url, { params }),
};

export default chapterImageApi;
