import userApi from "api/userApi";

const updateUser = async (id, data, setProgress) => {
  const response = await userApi.update(id, data, setProgress);
  return response;
};

export default updateUser;
