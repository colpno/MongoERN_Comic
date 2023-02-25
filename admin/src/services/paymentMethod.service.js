import paymentMethodApi from "api/paymentMethod.api";

const paymentMethodService = {
  getAll: async (params = {}) => {
    try {
      const response = await paymentMethodApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (method, setProgress = () => {}) => {
    try {
      const response = await paymentMethodApi.add(method, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  update: async (id, method, setProgress = () => {}) => {
    try {
      const response = await paymentMethodApi.update(id, method, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (id, setProgress = () => {}) => {
    try {
      const response = await paymentMethodApi.delete(id, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default paymentMethodService;