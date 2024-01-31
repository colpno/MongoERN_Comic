import { useDispatch, useSelector } from "react-redux";

import {
  useAddFollowMutation,
  useDeleteFollowMutation,
  useGetFollowsQuery,
} from "api/follow.api.js";
import { emitToast } from "features/Toast.jsx";
import { useEffect, useMemo } from "react";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { isEmpty } from "utils/isEmpty.js";

function useToggleFollow(titleId) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const getResponse = useGetFollowsQuery({
    user_id: user._id,
    title_id: titleId,
  });
  const { data, isFetching: isGetFetching } = getResponse;
  const isFollowed = useMemo(() => data && Object.keys(data).length > 0, [data]);
  const [add, addResponse] = useAddFollowMutation();
  const { isLoading: isAddLoading } = addResponse;
  const [del, deleteResponse] = useDeleteFollowMutation();
  const { isLoading: isDeleteLoading } = deleteResponse;

  useEffect(() => {
    dispatch(setLoading(isGetFetching));
  }, [isGetFetching]);

  useEffect(() => {
    dispatch(setLoading(isAddLoading));
  }, [isAddLoading]);

  useEffect(() => {
    dispatch(setLoading(isDeleteLoading));
  }, [isDeleteLoading]);

  const handleToggle = () => {
    if (isEmpty(user._id)) {
      emitToast("Bạn cần phải đăng nhập để theo dõi truyện", "error");
      return;
    }

    if (!isFollowed) {
      add(titleId);
    }
    if (isFollowed) {
      del({ title_id: titleId });
    }
  };

  return {
    handleToggle,
    isFollowed,
    follow: isFollowed ? data[0] : undefined,
    getResponse,
    addResponse,
    deleteResponse,
  };
}

export default useToggleFollow;
