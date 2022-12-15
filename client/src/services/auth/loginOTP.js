import authApi from "api/authApi";

const loginOTP = async (data) => {
  try {
    const response = await authApi.verifyOTP(data);
    return response[0];
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default loginOTP;
