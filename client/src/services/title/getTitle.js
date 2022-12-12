import titleApi from "api/titleApi";
import { convertTitlePropertyToString } from "utils/convertArrayPropertyToString";

const getTitle = async (ID, isPrivate = false) => {
  try {
    const response = await titleApi.getOne(ID, isPrivate);
    const converted = convertTitlePropertyToString(response[0]);
    return converted;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getTitle;
