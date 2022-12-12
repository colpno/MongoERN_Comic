import axiosClient from "libs/axios/axiosClient";

const url = "/users";

const userApi = {
  getOne: (id) => {
    return axiosClient.get(`${url}/${id}`);
  },

  update: (id, data, setProgress) =>
    axiosClient.put(`${url}/update/${id}`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const progress = (loaded / total) * 100;
        setProgress(progress);
      },
    }),

  delete: (id) =>
    axiosClient.delete(`${url}/delete/${id}`, { withCredentials: true }),
};

export default userApi;
