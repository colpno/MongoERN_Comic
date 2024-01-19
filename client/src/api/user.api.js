import axiosClient from "./axiosClient";

const url = "/users";

const userApi = {
  getOne: (params) => {
    return axiosClient.get(`${url}/profile`, {
      params,
      withCredentials: true,
    });
  },

  register: (data, setProgress = () => {}) => {
    return axiosClient.post(`${url}/register`, data, {
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const progress = (loaded / total) * 100;
        setProgress(progress);
      },
    });
  },

  update: (data, setProgress) => {
    return axiosClient.put(`${url}/update`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const progress = (loaded / total) * 100;
        setProgress(progress);
      },
    });
  },

  delete: (setProgress) => {
    return axiosClient.delete(`${url}/delete`, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const progress = (loaded / total) * 100;
        setProgress(progress);
      },
    });
  },
};

export default userApi;
