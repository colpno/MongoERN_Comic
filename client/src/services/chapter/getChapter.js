import chapterApi from "api/chapterApi";

const getChapter = async (chapterID, isPrivate = true) => {
  try {
    const response = await chapterApi.getOne(chapterID, isPrivate);
    return response[0];
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getChapter;
