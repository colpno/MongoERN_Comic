import notificationApi from "api/notification.api";

const notificationService = {
  getAll: async (params = {}) => {
    try {
      const response = await notificationApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  add: async (notification, setProgress = () => {}) => {
    try {
      const response = await notificationApi.add(notification, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  update: async (id, notification, setProgress = () => {}) => {
    try {
      const response = await notificationApi.update(id, notification, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (params, setProgress = () => {}) => {
    try {
      const response = await notificationApi.delete(params, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default notificationService;
