import axiosClient from "./axiosClient";

const url = "/personal-notifications";

const personalNotificationApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),

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

  update: (id, data, params = {}, setProgress = () => {}) =>
    axiosClient.put(`${url}/update/${id}`, data, {
      params,
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  delete: (params) => {
    return axiosClient.delete(`${url}/delete`, {
      withCredentials: true,
      params,
    });
  },
};

export default personalNotificationApi;
