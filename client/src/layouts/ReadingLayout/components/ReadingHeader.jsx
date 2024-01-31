import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Logo } from "assets/images";
import { Button } from "components";
import { useGetTitle, useToggleFavorite } from "hooks/index.jsx";
import styles from "../assets/styles/ReadingHeader.module.scss";
import ReadingNav from "./ReadingNav";
import ReadingTools from "./ReadingTools";

const cx = classNames.bind(styles);

function ReadingHeader() {
  const { titleId } = useParams();
  const user = useSelector((state) => state.user.user);
  const { chapter, favorite } = useSelector((state) => state.reading);
  const { data: title = [] } = useGetTitle({ params: { _id: titleId }, isPrivate: false });
  const { handleToggle, isFavored } = useToggleFavorite(chapter._id);
  const [controls, setControls] = useState({ isFavored });

  const activeLike = (isActivated) => {
    setControls((prev) => ({ ...prev, isFavored: isActivated }));
  };

  useEffect(() => {
    if (!isFavored) {
      activeLike(true);
    }
    if (isFavored) {
      activeLike(false);
    }
  }, []);

  useEffect(() => {
    if (favorite) {
      if (favorite.user_id === user._id) {
        activeLike(true);
      }
      if (Object.keys(favorite).length === 0) {
        activeLike(false);
      }
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
          <ReadingTools cx={cx} onToggleFavorite={handleToggle} controls={controls} />
        </header>
      )}
      {}
    </>
  );
}

export default ReadingHeader;
