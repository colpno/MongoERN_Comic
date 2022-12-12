import axiosClient from "libs/axios/axiosClient";

const url = "/purchased-chapters";

const purchasedChapterApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),
};

export default purchasedChapterApi;
