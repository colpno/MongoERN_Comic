import classNames from "classnames/bind";
import { useSelector } from "react-redux";

import styles from "pages/Reading/assets/styles/Reading.module.scss";
import { ReadingComics } from "./components";

const cx = classNames.bind(styles);

function Reading() {
  const chapterImages = useSelector((state) => state.chapter.chapter.images);

  return (
    <div className={cx("reading-page")}>
      {chapterImages.length > 0 && (
        <ReadingComics cx={cx} images={chapterImages} />
      )}
    </div>
  );
}

export default Reading;
