import axiosClient from "./axiosClient";

const url = "/reading-histories";

const readingHistoryApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),

  add: (titleId, chapterId) => {
    return axiosClient.post(
      `${url}/create`,
      { titleId, chapterId },
      { withCredentials: true }
    );
  },
};

export default readingHistoryApi;
