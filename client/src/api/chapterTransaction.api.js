import axiosClient from "./axiosClient";

const url = "/chapter-transactions";

const chapterTransactionApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),

  add: (titleId, chapterId, method, cost, expiredAt, setProgress = () => {}) => {
    return axiosClient.post(
      `${url}/create`,
      {
        titleId,
        chapterId,
        method,
        cost,
        expiredAt,
      },
      {
        withCredentials: true,
        onUploadProgress: (e) => {
          const { loaded, total } = e;
          const percentage = Math.floor((loaded / total) * 100);
          setProgress(percentage);
        },
      }
    );
  },
};

export default chapterTransactionApi;
