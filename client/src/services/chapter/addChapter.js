import chapterApi from "api/chapterApi";

const addChapter = async (chapter, setProgress) => {
  const response = await chapterApi.add(chapter, setProgress);
  return response;
};

export default addChapter;
