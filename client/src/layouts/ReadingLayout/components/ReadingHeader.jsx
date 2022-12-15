import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Logo } from "assets/images";
import { Button } from "components";
import { useToast } from "hooks";
import { setUserLike } from "libs/redux/slices/readingChapterSlice";
import { getTitle } from "services/title";
import { addUserLike, deleteUserLike } from "services/userLike";
import { isEmpty } from "utils";
import styles from "../assets/styles/ReadingHeader.module.scss";
import ReadingNav from "./ReadingNav";
import ReadingTools from "./ReadingTools";

const cx = classNames.bind(styles);

function ReadingHeader() {
  const dispatch = useDispatch();
  const { titleId } = useParams();
  const [title, setTitle] = useState({});
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const chapter = useSelector((state) => state.chapter.chapter.info);
  const user = useSelector((state) => state.user.user);
  const userLike = useSelector((state) => state.chapter.userLike);
  const { toastEmitter } = useToast();
  const [controls, setControls] = useState({
    isLiked: false,
  });

  const fetchData = () => {
    getTitle(titleId, false)
      .then((response) => setTitle(response))
      .catch((error) => console.log(error));
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleLikeClick = () => {
    if (isEmpty(user.guid)) {
      toastEmitter("Bạn cần phải đăng nhập để thích truyện", "error");
      return;
    }

    if (!controls.isLiked) {
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (userLike.userId === user.guid) {
      setIsLike(true);
    }
    if (Object.keys(userLike).length === 0) {
      setIsLike(false);
    }
  }, [userLike]);

  return (
    <>
      {Object.keys(chapter).length > 0 && Object.keys(title).length > 0 && (
        <header className={cx("reading-header")}>
          <Button wrapper to="/" className={cx("reading-header__logo")}>
            <Logo className={cx("logo")} />
          </Button>
          <div className={cx("reading-header__title")}>
            <Button text to={`/comic/title/${title.guid}`} title={title.name}>
              {title.name}
            </Button>
          </div>
          <ReadingNav
            cx={cx}
            chapter={chapter}
            totalChapter={title.totalChapter}
            titleId={titleId}
          />
          <ReadingTools
            cx={cx}
            darkTheme={darkTheme}
            handleChangeTheme={handleChangeTheme}
            isLike={isLike}
            handleLike={handleLikeClick}
          />
        </header>
      )}
      {}
    </>
  );
}

export default ReadingHeader;
