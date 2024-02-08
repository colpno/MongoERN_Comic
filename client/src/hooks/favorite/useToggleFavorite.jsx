import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "api/favorite.api.js";
import { emitToast } from "features/Toast.jsx";
import { setLoading } from "libs/redux/slices/common.slice.js";
import { setFavorite } from "libs/redux/slices/readingChapter.slice";
import { isEmpty } from "utils/isEmpty.js";
import useGetFavorites from "./useGetFavorites.jsx";

function useToggleFavorite(chapterId) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const favorite = useSelector((state) => state.reading.favorite);
  const isFavored = useMemo(() => favorite && Object.keys(favorite).length > 0, [favorite]);
  const [add, addResponse] = useAddFavoriteMutation();
  const { isLoading: isAddLoading, isSuccess: isAddSuccess, data: addData } = addResponse;
  const [del, deleteResponse] = useDeleteFavoriteMutation();
  const { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess } = deleteResponse;
  const getResponse = useGetFavorites({
    user_id: user._id,
    chapter_id: chapterId,
  });
  const { data: getData, isFetching: isGetFetching, isSuccess: isGetSuccess } = getResponse;

  useEffect(() => {
    dispatch(setLoading(isGetFetching));
  }, [isGetFetching]);

  useEffect(() => {
    dispatch(setLoading(isAddLoading));
  }, [isAddLoading]);

  useEffect(() => {
    dispatch(setLoading(isDeleteLoading));
  }, [isDeleteLoading]);

  useEffect(() => {
    if (isDeleteSuccess) {
      dispatch(setFavorite({}));
    }
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (isAddSuccess) {
      dispatch(setFavorite(addData));
    }
  }, [isAddSuccess]);

  useEffect(() => {
    if (isGetSuccess) {
      dispatch(setFavorite(getData[0]));
    }
  }, [isGetSuccess]);

  const handleToggle = () => {
    if (isEmpty(user)) {
      emitToast("Bạn cần phải đăng nhập để thực hiện hành động", "error");
      return;
    }

    if (isFavored) del(chapterId);
    else add(chapterId);
  };

  return {
    handleToggle,
    isFavored,
    favorite,
    getResponse,
    addResponse,
    deleteResponse,
  };
}

export default useToggleFavorite;
