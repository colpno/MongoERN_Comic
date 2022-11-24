import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import followApi from "api/followApi";
import { Recommend } from "features";
import { useToast } from "hooks";
import { setUserLike } from "libs/redux/slices/readingChapterSlice";
import styles from "pages/Reading/assets/styles/Reading.module.scss";
import { deleteFollow, getFollow } from "services/follow";
import { addUserLike, deleteUserLike } from "services/userLike";
import { isEmpty } from "utils";
import {
  ReadingComics,
  ReadingControls,
  ReadingPagination,
} from "./components";

const cx = classNames.bind(styles);

function Reading() {
  const dispatch = useDispatch();
  const { titleId } = useParams();
  const chapterImages = useSelector((state) => state.chapter.chapter.images);
  const chapter = useSelector((state) => state.chapter.chapter.info);
  const user = useSelector((state) => state.user.user);
  const chapters = useSelector((state) => state.chapter.chapters);
  const userLike = useSelector((state) => state.chapter.userLike);
  const { follow } = getFollow(user.guid, titleId);
  const { Toast, options, toastEmitter } = useToast();
  const [controls, setControls] = useState({
    isLiked: false,
    isFollowed: false,
  });

  const handleLikeClick = () => {
    if (isEmpty(user.guid)) {
      toastEmitter("Bạn cần phải đăng nhập để thích truyện", "error");
      return;
    }

    if (!userLike.guid && !controls.isLiked) {
      addUserLike(user.guid, chapter.guid)
        .then((response) => {
          toastEmitter(response.message, "success");
          setControls((prev) => ({ ...prev, isLiked: true }));
          dispatch(setUserLike(response.data));
        })
        .catch((error) => {
          toastEmitter(error.data.error, "error");
        });
    }
    if (controls.isLiked) {
      // toastEmitter("Bạn đã thích truyện này rồi", "error");
      deleteUserLike(user.guid, chapter.guid)
        .then(() => {
          setControls((prev) => ({ ...prev, isLiked: false }));
          dispatch(setUserLike({}));
        })
        .catch((error) => {
          toastEmitter(error.data.error, "error");
        });
    }
  };

  const handleFollowClick = () => {
    if (isEmpty(user.guid)) {
      toastEmitter("Bạn cần phải đăng nhập để theo dõi truyện", "error");
      return;
    }

    if (!controls.isFollowed) {
      followApi
        .add({ titleId })
        .then((response) => {
          if (response.affectedRows > 0) {
            toastEmitter("Bạn đã theo dõi truyện", "success");
            setControls((prev) => ({ ...prev, isFollowed: true }));
          }
        })
        .catch((error) => {
          toastEmitter(error.data.error, "error");
        });
    }
    if (controls.isFollowed) {
      // toastEmitter("Bạn đã theo dõi truyện này rồi", "error");
      deleteFollow(titleId)
        .then(() => {
          setControls((prev) => ({ ...prev, isFollowed: false }));
        })
        .catch((error) => {
          console.log("file: Reading.jsx ~ line 57 ~ error", error);
          toastEmitter(error.data.error, "error");
        });
    }
  };

  useEffect(() => {
    if (userLike?.userId === user.guid) {
      setControls((prev) => ({ ...prev, isLiked: true }));
    }
    if (Object.keys(userLike).length === 0) {
      setControls((prev) => ({ ...prev, isLiked: false }));
    }
  }, [userLike]);

  useEffect(() => {
    if (follow?.userId === user.guid) {
      setControls((prev) => ({ ...prev, isFollowed: true }));
    }
  }, [follow]);

  return (
    <>
      <div className={cx("reading-page")}>
        {chapterImages.length > 0 && (
          <ReadingComics cx={cx} images={chapterImages} />
        )}
        <ReadingControls
          cx={cx}
          handleLikeClick={handleLikeClick}
          handleFollowClick={handleFollowClick}
          isLiked={controls.isLiked}
          isFollowed={controls.isFollowed}
        />
        {chapters.length > 0 && <ReadingPagination chapters={chapters} />}
        <Recommend />
      </div>
      <Toast {...options} />
    </>
  );
}

export default Reading;
