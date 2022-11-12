import chapterApi from "api/chapterApi";

const deleteChapter = async (id, data, setProgress) => {
  const response = await chapterApi.delete(id, data, setProgress);
  return response;
};

export default deleteChapter;
