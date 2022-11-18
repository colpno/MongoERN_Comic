import authApi from "api/authApi";

const resetPassword = async (token, password) => {
  const response = await authApi.reset(token, password);
  return response;
};

export default resetPassword;
