import axiosClient from "./axiosClient";

const url = "/paypal";

const paypalApi = {
  order: (data = [], setProgress = () => {}) => {
    return axiosClient.post(
      `${url}/order`,
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
  capture: (orderID, setProgress = () => {}) => {
    return axiosClient.post(
      `${url}/capture`,
      { orderID },
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

export default paypalApi;
