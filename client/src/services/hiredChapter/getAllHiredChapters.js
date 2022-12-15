import hiredChapterApi from "api/hiredChapterApi";

const getAllHiredChapters = async (params = {}) => {
  try {
    const response = await hiredChapterApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllHiredChapters;
