import axiosClient from "libs/axios/axiosClient";

const url = "/titles";

const titleApi = {
  getAll: (params, isPrivate = true) =>
    axiosClient.get(`${url}`, { params, withCredentials: isPrivate }),

  getOne: (id, isPrivate = true) => {
    return axiosClient.get(`${url}/${isPrivate ? "private/" : ""}${id}`, {
      withCredentials: isPrivate,
    });
  },

  add: (data, setProgress) =>
    axiosClient.post(`${url}/create`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  update: (id, data, setProgress) =>
    axiosClient.put(`${url}/update/${id}`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),

  delete: (id, data, setProgress) =>
    axiosClient.delete(`${url}/delete/${id}`, {
      withCredentials: true,
      data: {
        data,
      },
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = Math.floor((loaded / total) * 100);
        setProgress(percentage);
      },
    }),
};

export default titleApi;
