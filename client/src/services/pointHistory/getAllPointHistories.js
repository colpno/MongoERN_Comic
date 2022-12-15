import pointHistoryApi from "api/pointHistoryApi";

const getAllPointHistories = async (params = {}) => {
  try {
    const response = await pointHistoryApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllPointHistories;
