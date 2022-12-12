import coinHistoryApi from "api/coinHistoryApi";
import { convertCoinHistoriesPropertyToString } from "utils/convertArrayPropertyToString";

const getAllCoinHistories = async (params = {}) => {
  try {
    const response = await coinHistoryApi.getAll(params);
    const converted = convertCoinHistoriesPropertyToString(response.data);
    return converted;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getAllCoinHistories;
