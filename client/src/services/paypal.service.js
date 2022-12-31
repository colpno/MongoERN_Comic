import paypalApi from "api/paypal.api";

const paypalService = {
  create: async (name, price, quantity) => {
    try {
      const data = { name, price, quantity };
      const response = await paypalApi.create(data);
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
