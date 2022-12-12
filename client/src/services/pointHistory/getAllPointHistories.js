import pointHistoryApi from "api/pointHistoryApi";
import { convertPointHistoriesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllPointHistories = async (params = {}) => {
  try {
    const response = await pointHistoryApi.getAll(params);
    const converted = convertPointHistoriesPropertyToString(response);
    return converted;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getAllPointHistories;
