import userLikeApi from "api/userLikeApi";

const deleteUserLike = async (userId, chapterId) => {
  const response = await userLikeApi.delete(userId, chapterId);
  return response;
};

export default deleteUserLike;
