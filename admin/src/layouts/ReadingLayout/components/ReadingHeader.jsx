import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Logo } from "assets/images";
import { Button } from "components";
import { useToast } from "hooks";
import { setFavorite } from "libs/redux/slices/readingChapter.slice";
import { favoriteService, titleService } from "services";
import { isEmpty } from "utils";
import styles from "../assets/styles/ReadingHeader.module.scss";
import ReadingNav from "./ReadingNav";
import ReadingTools from "./ReadingTools";

const cx = classNames.bind(styles);

function ReadingHeader() {
  const dispatch = useDispatch();
  const { titleId } = useParams();
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const { toastEmitter } = useToast();
  const [controls, setControls] = useState({ isLiked: false });
  const [title, setTitle] = useState({});
  const chapter = useSelector((state) => state.reading.chapter);
  const user = useSelector((state) => state.user.user);
  const favorite = useSelector((state) => state.reading.favorite);

  const fetchData = () => {
    titleService
      .getOne(titleId, false)
      .then((response) => setTitle(response.data))
      .catch((error) => console.error(error));
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleLikeClick = () => {
    if (isEmpty(user._id)) {
      toastEmitter("Bạn cần phải đăng nhập để thích truyện", "error");
      return;
    }

    if (!controls.isLiked) {
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
    }
    if (controls.isLiked) {
      favoriteService
        .delete(user._id, chapter._id)
        .then(() => {
          setControls((prev) => ({ ...prev, isLiked: false }));
          dispatch(setFavorite({}));
        })
        .catch((error) => {
          toastEmitter(error, "error");
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (favorite.user_id === user._id) {
      setIsLike(true);
    }
    if (Object.keys(favorite).length === 0) {
      setIsLike(false);
    }
  }, [favorite]);

  return (
    <>
      {Object.keys(chapter).length > 0 && Object.keys(title).length > 0 && (
        <header className={cx("reading-header")}>
          <Button wrapper to="/" className={cx("reading-header__logo")}>
            <Logo className={cx("logo")} />
          </Button>
          <div className={cx("reading-header__title")}>
            <Button text to={`/comic/title/${title._id}`} title={title.title}>
              {title.title}
            </Button>
          </div>
          <ReadingNav
            cx={cx}
            chapter={chapter}
            totalChapter={title.total_chapter}
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
