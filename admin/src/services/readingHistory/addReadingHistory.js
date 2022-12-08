import readingHistoriesApi from "api/readingHistoryApi";

export default async function addReadingHistory(titleId, chapterId, userId) {
  const response = await readingHistoriesApi.add({
    titleId,
    chapterId,
    userId,
  });
  return response;
}
