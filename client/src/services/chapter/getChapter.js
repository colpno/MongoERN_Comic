import chapterApi from "api/chapterApi";
import { convertChapterPropertyToString } from "utils/convertArrayPropertyToString";

const getChapter = async (chapterID, isPrivate = true) => {
  try {
    const response = await chapterApi.getOne(chapterID, isPrivate);
    const converted = convertChapterPropertyToString(response[0]);
    return converted;
  } catch (error) {
    return error.data.error || error.data.message;
  }
};

export default getChapter;
