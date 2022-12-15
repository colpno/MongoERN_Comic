import purchasedChapterApi from "api/purchasedChapterApi";

const getAllPurchasedChapters = async (params = {}) => {
  try {
    const response = await purchasedChapterApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllPurchasedChapters;
