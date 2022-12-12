import userApi from "api/userApi";
import { convertUserPropertyToString } from "utils/convertArrayPropertyToString";

const getUser = async (id) => {
  try {
    const response = await userApi.getOne(id);
    const converted = convertUserPropertyToString(response[0]);
    return converted;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getUser;
