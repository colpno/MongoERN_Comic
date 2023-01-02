import axiosClient from "./axiosClient";

const url = "/favorites";

const favoriteApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),

  add: (chapterId) => {
    return axiosClient.post(`${url}/create`, { chapterId }, { withCredentials: true });
  },

  delete: (chapterId) => {
    const params = { chapterId };

    return axiosClient.delete(`${url}/delete`, { params, withCredentials: true });
  },
};

export default favoriteApi;
