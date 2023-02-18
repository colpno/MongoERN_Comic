import axiosClient from "./axiosClient";

const url = "/payment-methods";

const paymentMethodApi = {
  getAll: (params) => axiosClient.get(url, { params }),
};

export default paymentMethodApi;
