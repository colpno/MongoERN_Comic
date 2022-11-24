import userLikeApi from "api/userLikeApi";

export default async function addUserLike(userId, chapterId) {
  const response = await userLikeApi.add(userId, chapterId);
  return response;
}
