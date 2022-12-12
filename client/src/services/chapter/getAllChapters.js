import chapterApi from "api/chapterApi";
import { convertChaptersPropertyToString } from "utils/convertArrayPropertyToString";

const getAllChapters = async (params = {}) => {
  try {
    const response = await chapterApi.getAll(params);
    const converted = convertChaptersPropertyToString(response);
    return converted;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getAllChapters;
