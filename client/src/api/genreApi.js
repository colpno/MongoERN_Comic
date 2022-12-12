import axiosClient from "libs/axios/axiosClient";

const url = "/genres";

const genreApi = {
  getAll: (params) => axiosClient.get(url, { params }),

  getOne: (id) => axiosClient.get(`${url}/${id}`),

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

  delete: (id, setProgress) =>
    axiosClient.delete(`${url}/delete/${id}`, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),
};

export default genreApi;
