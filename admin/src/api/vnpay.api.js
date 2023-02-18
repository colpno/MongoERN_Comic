import querystring from "query-string";
import axiosClient from "./axiosClient";

const url = "/vnpay";

const vnpayApi = {
  create: (data, setProgress = () => {}) => {
    return axiosClient.post(`${url}/create_payment_url`, data, {
      withCredentials: true,
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        const percentage = (loaded / total) * 100;
        setProgress(percentage);
      },
    });
  },
  get: (data, setProgress = () => {}) => {
    return axiosClient.get(`${url}/vnpay_return?${querystring.stringify(data)}`, {
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
