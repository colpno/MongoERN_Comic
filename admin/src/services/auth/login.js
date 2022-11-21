import authApi from "api/authApi";

const login = async (username, password) => {
  const response = await authApi.login(username, password);
  return response;
};

export default login;
