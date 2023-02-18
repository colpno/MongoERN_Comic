import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { followService } from "services";

function useFollow(titleId) {
  const user = useSelector((state) => state.user.user);
  const [follow, setFollow] = useState({});
  const isFollowed = Object.keys(follow).length > 0;
  const [fetchMessage, setFetchMessage] = useState({
    success: "",
    error: "",
  });

  const handleFollow = () => {
    followService
      .add(titleId)
      .then((response) => {
        setFollow(response.data);
        setFetchMessage((prev) => ({ ...prev, success: response.message }));
      })
      .catch((error) => setFetchMessage((prev) => ({ ...prev, error })));
  };

  const handleUnFollow = () => {
    followService
      .delete(titleId)
      .then(() => setFollow({}))
      .catch((error) => setFetchMessage((prev) => ({ ...prev, error })));
  };

  const handleFollowClick = () => {
    if (user._id) {
      setFetchMessage((prev) => ({
        ...prev,
        error: "Bạn cần phải đăng nhập để theo dõi truyện",
      }));
      return;
    }

    if (!isFollowed) {
      handleFollow();
    }
    if (isFollowed) {
      handleUnFollow();
    }
  };

  useEffect(() => {
    followService
      .getAll({
        user_id: user._id,
        title_id: titleId,
      })
      .then((response) => setFollow(response.data))
      .catch((error) => setFetchMessage((prev) => ({ ...prev, error })));
  }, []);

  return {
    handleFollow: handleFollowClick,
    isFollowed,
    follow,
    successMessage: fetchMessage.success,
    errorMessage: fetchMessage.error,
  };
}

export default useFollow;
