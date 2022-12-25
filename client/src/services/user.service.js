import userApi from "api/user.api";

const userService = {
  getOne: async () => {
    try {
      const response = await userApi.getOne();
      return response[0];
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  register: async (user) => {
    try {
      const response = await userApi.register(user);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  update: async (data = {}, setProgress = () => {}) => {
    try {
      const response = await userApi.update(data, setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  delete: async (setProgress = () => {}) => {
    try {
      const response = await userApi.delete(setProgress);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default userService;
