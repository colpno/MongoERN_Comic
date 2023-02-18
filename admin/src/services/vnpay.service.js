import vnpayApi from "api/vnpay.api";

const vnpayService = {
  create: async (data) => {
    try {
      const response = await vnpayApi.create(data);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  get: async (data) => {
    try {
      const response = await vnpayApi.get(data);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default vnpayService;
