import axiosClient from "./axiosClient";

const url = "/notifications";

const notificationApi = {
  getAll: (params) => axiosClient.get(url, { params }),

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

  update: (id, data, setProgress = () => {}) => {
    return axiosClient.put(`${url}/update/${id}`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
  },

  delete: (params, setProgress = () => {}) => {
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

export default notificationApi;
