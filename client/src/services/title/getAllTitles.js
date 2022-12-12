import titleApi from "api/titleApi";
import { convertTitlesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllTitles = async (params = {}) => {
  try {
    const response = await titleApi.getAll(params);
    const converted = convertTitlesPropertyToString(response);
    return converted;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getAllTitles;
