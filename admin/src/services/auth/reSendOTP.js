import authApi from "api/authApi";

const reSendOTP = async () => {
  const response = await authApi.reSendOTP();
  return response;
};

export default reSendOTP;
