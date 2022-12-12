import axiosClient from "libs/axios/axiosClient";

const url = "/hired-chapters";

const hiredChapterApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),
};

export default hiredChapterApi;
