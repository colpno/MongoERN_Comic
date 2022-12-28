import authApi from "api/auth.api";

const authService = {
  login: async (username, password) => {
    try {
      const response = await authApi.login(username, password);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  verifyLogin: async (id, username, email, otp) => {
    try {
      const response = await authApi.verifyLogin(id, username, email, otp);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  logout: async () => {
    try {
      const response = await authApi.logout();
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  verifyRegister: async (token) => {
    try {
      const response = await authApi.verifyRegister(token);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  sendOTP: async (id, username, email) => {
    try {
      const response = await authApi.reSendOTP(id, username, email);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  forgotPassword: async (username, email) => {
    try {
      const response = await authApi.forgot(username, email);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
  resetPassword: async (userId, password, token) => {
    try {
      const response = await authApi.reset(userId, password, token);
      return response;
    } catch (error) {
      return Promise.reject(error.data);
    }
  },
};

export default authService;
