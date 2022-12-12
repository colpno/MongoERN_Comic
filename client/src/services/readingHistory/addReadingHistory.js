import readingHistoriesApi from "api/readingHistoryApi";

const addReadingHistory = async (titleId, chapterId, userId) => {
  const response = await readingHistoriesApi.add({
    titleId,
    chapterId,
    userId,
  });
  return response;
};

export default addReadingHistory;
