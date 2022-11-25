import authApi from "api/authApi";

const loginOTP = async (data) => {
  const response = await authApi.verifyOTP(data);
  return response;
};

export default loginOTP;
