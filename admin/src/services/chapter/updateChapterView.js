import chapterApi from "api/chapterApi";

const updateChapterView = async (id) => {
  const response = await chapterApi.updateView(id);
  return response;
};

export default updateChapterView;
