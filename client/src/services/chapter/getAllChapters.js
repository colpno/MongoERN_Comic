import chapterApi from "api/chapterApi";

const getAllChapters = async (params = {}, isPrivate = true) => {
  try {
    const response = await chapterApi.getAll(params, isPrivate);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllChapters;
