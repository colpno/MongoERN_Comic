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
  add: async (data, setProgress = () => {}) => {
    try {
      const response = await paymentMethodApi.add(data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  update: async (id, data, setProgress = () => {}) => {
    try {
      const response = await paymentMethodApi.update(id, data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (params, setProgress = () => {}) => {
    try {
      const response = await paymentMethodApi.delete(params, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default paymentMethodService;
