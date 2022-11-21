import authApi from "api/authApi";

const register = async (user) => {
  const response = await authApi.register(user);
  return response;
};

export default register;
