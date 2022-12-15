import userApi from "api/userApi";

const getUser = async (id) => {
  try {
    const response = await userApi.getOne(id);
    return response[0];
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getUser;
