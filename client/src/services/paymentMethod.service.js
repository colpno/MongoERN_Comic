import paymentMethodApi from "api/paymentMethodApi";

const paymentMethodService = {
  getAll: async (params = {}) => {
    try {
      const response = await paymentMethodApi.getAll(params);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  add: async (method, setProgress) => {
    try {
      const response = await paymentMethodApi.add(method, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  update: async (id, method, setProgress) => {
    try {
      const response = await paymentMethodApi.update(id, method, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  delete: async (id, setProgress) => {
    try {
      const response = await paymentMethodApi.delete(id, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default paymentMethodService;
