import { Logo } from "assets/images";
import classNames from "classnames/bind";
import { Button } from "components";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { getChapterByID } from "services/chapter";
import { getTitleByID } from "services/title";
import styles from "../assets/styles/ReadingHeader.module.scss";
import ReadingNav from "./ReadingNav";
import ReadingTools from "./ReadingTools";

const cx = classNames.bind(styles);

function ReadingHeader() {
  const slugs = useParams(0);
  const { chapterId, titleId } = slugs;
  const { title } = getTitleByID(titleId);
  const { chapter } = getChapterByID(chapterId, titleId);
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const handleLike = () => {
    setIsLike(!isLike);
  };

  return (
    <>
      {Object.keys(chapter).length > 0 && Object.keys(title).length > 0 && (
        <header className={cx("reading-header")}>
          <Button wrapper to="/" className={cx("reading-header__logo")}>
            <Logo className={cx("logo")} />
          </Button>
          <div className={cx("reading-header__title")}>
            <Button
              text
              to={`/comic/title/${title.id}`}
              title={title.titleName}
            >
              {title.titleName}
            </Button>
          </div>
          <ReadingNav
            cx={cx}
            chapter={chapter}
            totalChapter={title.totalChapter}
            titleId={slugs.titleId}
          />
          <ReadingTools
            cx={cx}
            darkTheme={darkTheme}
            handleChangeTheme={handleChangeTheme}
            isLike={isLike}
            handleLike={handleLike}
          />
        </header>
      )}
      {}
    </>
  );
}

export default ReadingHeader;
