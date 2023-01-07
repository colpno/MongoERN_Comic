import axiosClient from "./axiosClient";

const url = "/paypal";

const vnpayApi = {
  payment: (data = [], setProgress = () => {}) => {
    return axiosClient.post(
      `${url}/payment`,
      { data },
      {
        withCredentials: true,
        onUploadProgress: (e) => {
          const { loaded, total } = e;
          const percentage = (loaded / total) * 100;
          setProgress(percentage);
        },
      }
    );
  },
  payout: (data = [], setProgress = () => {}) => {
    return axiosClient.post(
      `${url}/payout`,
      { data },
      {
        withCredentials: true,
        onUploadProgress: (e) => {
          const { loaded, total } = e;
          const percentage = (loaded / total) * 100;
          setProgress(percentage);
        },
      }
    );
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
