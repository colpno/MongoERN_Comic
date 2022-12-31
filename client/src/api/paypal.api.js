import axiosClient from "./axiosClient";

const url = "/paypal";

const vnpayApi = {
  create: (data, setProgress = () => {}) => {
    return axiosClient.post(`${url}/create`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
  },
  get: (data, setProgress = () => {}) => {
    return axiosClient.get(`${url}/success${data}`, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
  },
};

export default vnpayApi;
