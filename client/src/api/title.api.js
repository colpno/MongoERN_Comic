import axiosClient from "./axiosClient";

const url = "/titles";

const titleApi = {
  getAll: (params = {}, isPrivate = true) => {
    if (isPrivate) {
      return axiosClient.get(`${url}/owned`, {
        params,
        withCredentials: isPrivate,
      });
    }
    return axiosClient.get(url, { params, withCredentials: isPrivate });
  },

  getOne: (id, isPrivate = true) => {
    if (isPrivate) {
      return axiosClient.get(`${url}/owned/${id}`, {
        withCredentials: isPrivate,
      });
    }
    return axiosClient.get(`${url}/${id}`, { withCredentials: isPrivate });
  },

  random: (count, params = {}) => {
    return axiosClient.get(`${url}/random`, {
      params: {
        ...params,
        count,
      },
    });
  },

  add: (
    title,
    cover,
    author,
    summary,
    genres,
    coin,
    releaseDay,
    setProgress = () => {}
  ) => {
    return axiosClient.post(
      `${url}/create`,
      {
        title,
        cover,
        author,
        summary,
        genres,
        coin,
        releaseDay,
      },
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

  update: (id, data, setProgress) =>
    axiosClient.put(`${url}/update/${id}`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  delete: (id, setProgress, params = {}) =>
    axiosClient.delete(`${url}/delete/${id}`, {
      params,
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = Math.floor((loaded / total) * 100);
        setProgress(percentage);
      },
    }),
};

export default titleApi;
