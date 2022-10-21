/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import chapterApi from "api/chapterApi";
import { Logo } from "assets/images";
import Button from "components/Button";
import { getTitleByID } from "services/title";
import styles from "../assets/styles/ReadingHeader.module.scss";
import ReadingNav from "./ReadingNav";
import ReadingTools from "./ReadingTools";

const cx = classNames.bind(styles);

function ReadingHeader() {
  const slugs = useParams(0);
  const { chapterId, titleId } = slugs;
  const { title } = getTitleByID(titleId);
  const [chapter, setChapter] = useState({});
  const [darkTheme, setDarkTheme] = useState(false);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await chapterApi.getOneById(chapterId);
        setChapter(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchChapter();
  }, []);

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
          <div className={cx("reading-header__logo")}>
            <Button wrapper to="/">
              <img src={Logo} alt="Logo" />
            </Button>
          </div>
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
            title={title}
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
