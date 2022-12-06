import userLikeApi from "api/userLikeApi";
import { useEffect, useState } from "react";

export default function getUserLike(userId, chapterId) {
  const [userLike, setUserLike] = useState({});

  const fetch = async () => {
    try {
      const response = await userLikeApi.getOne(userId, chapterId);
      setUserLike(response[0]);
    } catch (error) {
      console.log("file: getUserLike.js:12 ~ error", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { userLike, setUserLike };
}
