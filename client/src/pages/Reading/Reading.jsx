import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Recommend } from "features";
import { useToast } from "hooks";
import { setUserLike } from "libs/redux/slices/readingChapterSlice";
import styles from "pages/Reading/assets/styles/Reading.module.scss";
import { addFollow, deleteFollow, getAllFollows } from "services/follow";
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
  const [follows, setFollows] = useState([]);
  const { Toast, options, toastEmitter } = useToast();
  const [controls, setControls] = useState({
    isLiked: false,
    isFollowed: false,
  });

  const fetchData = () => {
    getAllFollows({
      userId: user.guid,
      titleId,
    })
      .then((response) => setFollows(response))
      .catch((error) => console.log(error));
  };

  const handleUserLike = () => {
    addUserLike(user.guid, chapter.guid)
      .then((response) => {
        toastEmitter(response.message, "success");
        setControls((prev) => ({ ...prev, isLiked: true }));
        dispatch(setUserLike(response.data));
      })
      .catch((error) => {
        toastEmitter(error.data.error, "error");
      });
  };

  const handleRemoveUserLike = () => {
    deleteUserLike(user.guid, chapter.guid)
      .then(() => {
        setControls((prev) => ({ ...prev, isLiked: false }));
        dispatch(setUserLike({}));
      })
      .catch((error) => {
        toastEmitter(error.data.error, "error");
      });
  };

  const handleLikeClick = () => {
    if (isEmpty(user.guid)) {
      toastEmitter("Bạn cần phải đăng nhập để thích truyện", "error");
      return;
    }

    if (!userLike.guid && !controls.isLiked) {
      handleUserLike();
    }
    if (controls.isLiked) {
      handleRemoveUserLike();
    }
  };

  const handleFollow = () => {
    addFollow({ titleId })
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Bạn đã theo dõi truyện", "success");
          setControls((prev) => ({ ...prev, isFollowed: true }));
        }
      })
      .catch((error) => {
        toastEmitter(error.data.error, "error");
      });
  };

  const handleUnFollow = () => {
    deleteFollow(titleId)
      .then(() => {
        setControls((prev) => ({ ...prev, isFollowed: false }));
      })
      .catch((error) => {
        console.log("file: Reading.jsx ~ line 57 ~ error", error);
        toastEmitter(error.data.error, "error");
      });
  };

  const handleFollowClick = () => {
    if (isEmpty(user.guid)) {
      toastEmitter("Bạn cần phải đăng nhập để theo dõi truyện", "error");
      return;
    }

    if (!controls.isFollowed) {
      handleFollow();
    }
    if (controls.isFollowed) {
      handleUnFollow();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userLike?.userId === user.guid) {
      setControls((prev) => ({ ...prev, isLiked: true }));
    }
    if (Object.keys(userLike).length === 0) {
      setControls((prev) => ({ ...prev, isLiked: false }));
    }
  }, [userLike]);

  useEffect(() => {
    if (follows?.userId === user.guid) {
      setControls((prev) => ({ ...prev, isFollowed: true }));
    }
  }, [follows]);

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
