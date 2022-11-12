import userApi from "api/userApi";

const deleteUser = async (guid) => {
  const response = await userApi.delete(guid);
  return response;
};

export default deleteUser;
