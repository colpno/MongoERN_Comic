import authApi from "api/authApi";

const login = (username, password) => {
  const add = async () => {
    const response = await authApi.login(username, password);
    return response;
  };
  add();
};

export default login;
