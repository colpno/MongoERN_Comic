import axiosClient from "libs/axios/axiosClient";

const url = "/user-like";

const userLikeApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  add: (userId, chapterId) =>
    axiosClient.post(`${url}/create`, { userId, chapterId }),

  delete: (userId, chapterId) =>
    axiosClient.delete(`${url}/delete?userId=${userId}&chapterId=${chapterId}`),
};

export default userLikeApi;
