import chapterImageApi from "api/chapterImageApi";

const getAllChapterImages = async (params = {}) => {
  try {
    const response = await chapterImageApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllChapterImages;
