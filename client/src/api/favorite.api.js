import axiosClient from "./axiosClient";

const url = "/favorites";

const favoriteApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),

  add: (userId, chapterId, setProgress = () => {}) => {
    return axiosClient.post(
      `${url}/create`,
      { userId, chapterId },
      {
        withCredentials: true,
        onUploadProgress: (e) => {
          const { loaded, total } = e;
          const percentage = (loaded / total) * 100;
          setProgress(percentage);
        },
      }
    );
  },

  delete: (chapterId, setProgress = () => {}) => {
    const params = { chapterId };

    return axiosClient.delete(`${url}/delete`, {
      params,
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
  },
};

export default favoriteApi;
