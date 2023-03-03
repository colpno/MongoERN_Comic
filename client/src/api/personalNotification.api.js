import axiosClient from "./axiosClient";

const url = "/personal-notifications";

const personalNotificationApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),

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
      params,
      withCredentials: true,
    });
  },
};

export default personalNotificationApi;
