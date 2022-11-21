import chapterApi from "api/chapterApi";

const updateChapter = async (id, data, setProgress) => {
  const response = await chapterApi.update(id, data, setProgress);
  return response;
};

export default updateChapter;
