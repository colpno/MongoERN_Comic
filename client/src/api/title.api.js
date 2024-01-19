import axiosClient from "./axiosClient";

const url = "/titles";

const titleApi = {
  getAll: (params = {}, isPrivate = true) => {
    const fullURL = isPrivate ? `${url}/owned` : url;

    return axiosClient.get(fullURL, { params, withCredentials: isPrivate });
  },

  getOne: (id, params, isPrivate = true) => {
    const fullURL = isPrivate ? `${url}/owned/${id}` : `${url}/${id}`;

    return axiosClient.get(fullURL, {
      params,
      withCredentials: isPrivate,
    });
  },

  random: (params = {}) => {
    return axiosClient.get(`${url}/random`, {
      params,
    });
  },

  add: (data, setProgress = () => {}) => {
    return axiosClient.post(`${url}/create`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
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

  delete: (id, params = {}, setProgress = () => {}) =>
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
