import axiosClient from "./axiosClient";

const url = "/transactions";

const transactionApi = {
  getAll: (params) => axiosClient.get(url, { params, withCredentials: true }),
  add: (data, setProgress = () => {}) =>
    axiosClient.post(`${url}/create`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    }),
};

export default transactionApi;
