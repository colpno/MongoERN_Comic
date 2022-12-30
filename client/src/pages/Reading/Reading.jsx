import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Recommend } from "features";
import { useToast } from "hooks";
import {
  setChapter as setChapterStore,
  setChapters as setChaptersStore,
  setFavorite as setFavoriteStore,
} from "libs/redux/slices/readingChapter.slice";
import styles from "pages/Reading/assets/styles/Reading.module.scss";
import {
  chapterService,
  favoriteService,
  followService,
  readingHistoryService,
} from "services";
import { isEmpty } from "utils";
import {
  ReadingComics,
  ReadingControls,
  ReadingPagination,
} from "./components";

const cx = classNames.bind(styles);

function Reading() {
  const dispatch = useDispatch();
  const { chapterId, titleId } = useParams();
  const user = useSelector((state) => state.user.user);
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const [chapter, setChapter] = useState({});
  const [chapters, setChapters] = useState([]);
  const [favorite, setFavorite] = useState({});
  const [follows, setFollows] = useState([]);
  const { Toast, options, toastEmitter } = useToast();
  const [controls, setControls] = useState({
    isLiked: false,
    isFollowed: false,
  });

  const fetchData = () => {
    const chapterPromise = chapterService.getOne(chapterId, false);
    const chaptersPromise = chapterService.getAll(
      {
        titleId,
        _sort: "order",
        _order: "asc",
      },
      false
    );
    const favoritePromise = favoriteService.getAll({
      userId: user._id,
      chapterId,
    });
    const followPromise = followService.getAll({
      userId: user._id,
      titleId,
    });

    Promise.all([
      chapterPromise,
      chaptersPromise,
      favoritePromise,
      followPromise,
    ])
      .then(
        ([
          chapterResponse,
          chaptersResponse,
          favoriteResponse,
          followResponse,
        ]) => {
          setChapter(chapterResponse.data);
          setChapters(chaptersResponse.data);
          setFavorite(favoriteResponse.data);
          setFollows(followResponse.data);
        }
      )
      .catch((error) => console.error(error));
  };

  const handleUserLike = () => {
    favoriteService
      .add(user._id, chapter._id)
      .then((response) => {
        toastEmitter(response.message, "success");
        setControls((prev) => ({ ...prev, isLiked: true }));
        dispatch(setFavorite(response.data));
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });
  };

  const handleRemoveUserLike = () => {
    favoriteService
      .delete(user._id, chapter._id)
      .then(() => {
        setControls((prev) => ({ ...prev, isLiked: false }));
        dispatch(setFavorite({}));
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });
  };

  const handleLikeClick = () => {
    if (isEmpty(user._id)) {
      toastEmitter("Bạn cần phải đăng nhập để thích truyện", "error");
      return;
    }

    if (!favorite._id && !controls.isLiked) {
      handleUserLike();
    }
    if (controls.isLiked) {
      handleRemoveUserLike();
    }
  };

  const handleFollow = () => {
    followService
      .add(titleId)
      .then((response) => {
        if (response.affectedRows > 0) {
          toastEmitter("Bạn đã theo dõi truyện", "success");
          setControls((prev) => ({ ...prev, isFollowed: true }));
        }
      })
      .catch((error) => {
        toastEmitter(error, "error");
      });
  };

  const handleUnFollow = () => {
    followService
      .delete(titleId)
      .then(() => {
        setControls((prev) => ({ ...prev, isFollowed: false }));
      })
      .catch((error) => {
        console.log("file: Reading.jsx ~ line 57 ~ error", error);
        toastEmitter(error, "error");
      });
  };

  const handleFollowClick = () => {
    if (isEmpty(user._id)) {
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
    if (favorite?.user_id === user._id) {
      setControls((prev) => ({ ...prev, isLiked: true }));
    }
    if (Object.keys(favorite).length === 0) {
      setControls((prev) => ({ ...prev, isLiked: false }));
    }
  }, [favorite]);

  useEffect(() => {
    if (follows?.user_id === user._id) {
      setControls((prev) => ({ ...prev, isFollowed: true }));
    }
  }, [follows]);

  useEffect(() => {
    chapter?._id && dispatch(setChapterStore(chapter));
  }, [chapter]);

  useEffect(() => {
    favorite?._id && dispatch(setFavoriteStore(favorite));
  }, [favorite]);

  useEffect(() => {
    chapters.length > 0 && dispatch(setChaptersStore(chapters));
  }, [chapters]);

  useEffect(() => {
    setTimeout(() => {
      chapterService.update(chapterId, { view: 1 });
      isLoggingIn && readingHistoryService.add(titleId, chapterId, user._id);
    }, 60 * 1000);
  }, []);

  return (
    <>
      <div className={cx("reading-page")}>
        {chapter?.contents?.length > 0 && (
          <ReadingComics cx={cx} images={chapter.contents} />
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
