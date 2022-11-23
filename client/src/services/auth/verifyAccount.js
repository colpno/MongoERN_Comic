import authApi from "api/authApi";

const VerifyAccount = async (token) => {
  const response = await authApi.verifyRegister(token);
  return response;
};

export default VerifyAccount;
