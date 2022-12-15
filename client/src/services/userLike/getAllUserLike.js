import userLikeApi from "api/userLikeApi";

const getAllUserLike = async (params = {}) => {
  try {
    const response = await userLikeApi.getAll(params);
    return response;
  } catch (error) {
    return error?.data?.error || error?.data?.message;
  }
};

export default getAllUserLike;
