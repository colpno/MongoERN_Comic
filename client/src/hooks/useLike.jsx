import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setFavorite } from "libs/redux/slices/readingChapter.slice";
import { favoriteService } from "services";

function useLike(chapterId) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const favorite = useSelector((state) => state.reading.favorite);
  const isLike = Object.keys(favorite).length > 0;
  const [fetchMessage, setFetchMessage] = useState({
    success: "",
    error: "",
  });

  const handleLike = () => {
    favoriteService
      .add(chapterId)
      .then((response) => {
        dispatch(setFavorite(response.data));
        setFetchMessage({ error: "", success: response.message });
      })
      .catch((error) => setFetchMessage((prev) => ({ ...prev, error })));
  };

  const handleRemoveLike = () => {
    favoriteService
      .delete(chapterId)
      .then(() => {
        dispatch(setFavorite({}));
        setFetchMessage({ error: "", success: "" });
      })
      .catch((error) => setFetchMessage((prev) => ({ ...prev, error })));
  };

  const handleLikeClick = () => {
    if (Object.keys(user).length <= 0) {
      setFetchMessage((prev) => ({ ...prev, error: "Bạn cần phải đăng nhập để thích truyện" }));
      return;
    }
    setFetchMessage((prev) => ({ ...prev, error: "" }));

    if (!isLike) {
      handleLike();
    }
    if (isLike) {
      handleRemoveLike();
    }
  };

  useEffect(() => {
    if (!isLike) {
      favoriteService
        .getAll({
          user_id: user._id,
          chapter_id: chapterId,
        })
        .then((response) => {
          dispatch(setFavorite(response.data));
        })
        .catch((error) => setFetchMessage((prev) => ({ ...prev, error })));
    }
  }, []);

  return {
    handleLike: handleLikeClick,
    isLike,
    favorite,
    successMessage: fetchMessage.success,
    errorMessage: fetchMessage.error,
  };
}

export default useLike;
