import userApi from "api/user.api";

const userService = {
  getAll: async (params = {}) => {
    try {
      const response = await userApi.getAll(params);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  register: async (user) => {
    try {
      const response = await userApi.register(user);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  update: async (id, data = {}, setProgress = () => {}) => {
    try {
      const response = await userApi.update(id, data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (params, setProgress = () => {}) => {
    try {
      const response = await userApi.delete(params, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default userService;
