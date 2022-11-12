import authApi from "api/authApi";

const resetPassword = async (info) => {
  const response = await authApi.reset(info);
  return response;
};

export default resetPassword;
