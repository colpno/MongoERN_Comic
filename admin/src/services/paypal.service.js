import paypalApi from "api/paypal.api";

const paypalService = {
  payment: async (data = []) => {
    try {
      const response = await paypalApi.payment(data);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  payout: async (data = []) => {
    try {
      const response = await paypalApi.payout(data);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  get: async (data) => {
    try {
      const response = await paypalApi.get(data);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default paypalService;
