import authApi from "api/authApi";

const authService = {
  login: async (username, password) => {
    try {
      const response = await authApi.login(username, password);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  verifyLogin: async (id, username, email, otp) => {
    try {
      const response = await authApi.verifyLogin(otp);
      return response[0];
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  logout: async () => {
    try {
      const response = await authApi.logout();
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  verifyRegister: async (token) => {
    try {
      const response = await authApi.verifyRegister(token);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  sendOTP: async (id, username, email) => {
    try {
      const response = await authApi.reSendOTP(id, username, email);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  forgotPassword: async (username, email) => {
    try {
      const response = await authApi.forgot(username, email);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
  resetPassword: async (userId, password, token) => {
    try {
      const response = await authApi.reset(userId, password, token);
      return response;
    } catch (error) {
      return error?.data?.error || error?.data?.message;
    }
  },
};

export default authService;
