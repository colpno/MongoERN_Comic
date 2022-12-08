import axiosClient from "libs/axios/axiosClient";

const url = "/user-like";

const userLikeApi = {
  getOne: (userId, chapterId) =>
    axiosClient.get(`${url}?userId=${userId}&chapterId=${chapterId}`),

  add: (userId, chapterId) =>
    axiosClient.post(`${url}/create`, { userId, chapterId }),

  delete: (userId, chapterId) =>
    axiosClient.delete(`${url}/delete?userId=${userId}&chapterId=${chapterId}`),
};

export default userLikeApi;
