import userApi from "api/user.api";

const userService = {
  getOne: async () => {
    try {
      const response = await userApi.getOne();
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
  update: async (data = {}, setProgress = () => {}) => {
    try {
      const response = await userApi.update(data, setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  delete: async (setProgress = () => {}) => {
    try {
      const response = await userApi.delete(setProgress);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default userService;
