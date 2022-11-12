import authApi from "api/authApi";

const logout = () => {
  const add = async () => {
    const response = await authApi.logout();
    return response;
  };
  add();
};

export default logout;
