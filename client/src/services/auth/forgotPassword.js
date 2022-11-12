import authApi from "api/authApi";

const forgotPassword = async (info) => {
  const response = await authApi.forgot(info);
  return response;
};

export default forgotPassword;
