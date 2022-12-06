import userLikeApi from "api/userLikeApi";

export default async function deleteUserLike(userId, chapterId) {
  const response = await userLikeApi.delete(userId, chapterId);
  return response;
}
