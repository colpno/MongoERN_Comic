import classNames from "classnames/bind";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Logo } from "assets/images";
import { Button } from "components";
import { setToast } from "libs/redux/slices/common.slice.js";
import { setFavorite } from "libs/redux/slices/readingChapter.slice";
import { changeTheme } from "libs/redux/slices/theme.slice";
import { favoriteService, titleService } from "services";
import { isEmpty } from "utils";
import styles from "../assets/styles/ReadingHeader.module.scss";
import ReadingNav from "./ReadingNav";
import ReadingTools from "./ReadingTools";

const cx = classNames.bind(styles);

function ReadingHeader() {
  const dispatch = useDispatch();
  const { titleId } = useParams();
  const theme = useSelector((state) => state.theme.theme);
  const isDarkMode = theme === "dark";
  const user = useSelector((state) => state.user.user);
  const { chapter, favorite } = useSelector((state) => state.reading);
  const [state, updateState] = useReducer((prev, next) => ({ ...prev, ...next }), {
    isLike: false,
    controls: { isLiked: false },
    title: {},
  });

  const activeLike = (isActivated) => {
    updateState({ controls: { ...state.controls, isLiked: isActivated } });
  };

  const handleChangeTheme = () => {
    dispatch(changeTheme(!isDarkMode));
  };

  const handleLikeClick = () => {
    if (isEmpty(user._id)) {
      dispatch(setToast("Bạn cần phải đăng nhập để thích truyện", "error"));
      return;
    }

    if (!state.controls.isLiked) {
      favoriteService.add(user._id, chapter._id).then((response) => {
        activeLike(true);
        dispatch(setFavorite(response.data));
      });
    }
    if (state.controls.isLiked) {
      favoriteService.delete(user._id, chapter._id).then(() => {
        activeLike(false);
        dispatch(setFavorite({}));
      });
    }
  };

  useEffect(() => {
    titleService
      .getOne({ _id: titleId }, false)
      .then((response) => updateState({ title: response.data }));
  }, []);

  useEffect(() => {
    if (favorite.user_id === user._id) {
      activeLike(true);
    }
    if (Object.keys(favorite).length === 0) {
      activeLike(false);
    }
  }, [favorite]);

  return (
    <>
      {Object.keys(chapter).length > 0 && Object.keys(state.title).length > 0 && (
        <header className={cx("reading-header")}>
          <Button wrapper to="/" className={cx("reading-header__logo")}>
            <Logo className={cx("logo")} />
          </Button>
          <div className={cx("reading-header__title")}>
            <Button text to={`/comic/title/${state.title._id}`} title={state.title.title}>
              {state.title.title}
            </Button>
          </div>
          <ReadingNav
            cx={cx}
            chapter={chapter}
            totalChapter={state.title.total_chapter}
            titleId={titleId}
          />
          <ReadingTools
            cx={cx}
            isDarkMode={state.isDarkMode}
            handleChangeTheme={handleChangeTheme}
            isLike={state.isLike}
            handleLike={handleLikeClick}
          />
        </header>
      )}
      {}
    </>
  );
}

export default ReadingHeader;
