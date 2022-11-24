import chapterApi from "api/chapterApi";

const updateChapter = async (id, data, setProgress, isPrivate = true) => {
  const response = await chapterApi.update(id, data, setProgress, isPrivate);
  return response;
};

export default updateChapter;
