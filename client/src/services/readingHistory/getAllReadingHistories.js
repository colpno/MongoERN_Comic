import readingHistoryApi from "api/readingHistoryApi";

const getAllReadingHistories = async (params = {}) => {
  try {
    const response = await readingHistoryApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllReadingHistories;
