/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Recommend } from "features";
import styles from "pages/Reading/assets/styles/Reading.module.scss";
import GGPlay from "./assets/images/icons8-google-play-48.png";
import {
  ReadingComics,
  ReadingControls,
  ReadingPagination,
} from "./components";

const cx = classNames.bind(styles);

function Reading() {
  const chapterImages = useSelector((state) => state.chapter.chapter.images);
  const chapters = useSelector((state) => state.chapter.chapters);

  return (
    <>
      <div className={cx("reading-page")}>
        {chapterImages.length > 0 && (
          <ReadingComics cx={cx} images={chapterImages} />
        )}
        <ReadingControls cx={cx} GGPlay={GGPlay} />
        {chapters.length > 0 && <ReadingPagination chapters={chapters} />}
        <Recommend />
      </div>
      {}
    </>
  );
}

export default Reading;
