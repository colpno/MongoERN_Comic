import personalNotificationApi from "api/personalNotification.api";

const personalNotificationService = {
  getAll: async (params = {}) => {
    try {
      const response = await personalNotificationApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  update: async (id, data = {}, params = {}, setProgress = () => {}) => {
    try {
      const response = await personalNotificationApi.update(id, data, params, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (id) => {
    try {
      const response = await personalNotificationApi.delete(id);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default personalNotificationService;
