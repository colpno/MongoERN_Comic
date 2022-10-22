import classNames from "classnames/bind";
import { useParams } from "react-router-dom";

import { Recommend } from "features";
import styles from "pages/Reading/assets/styles/Reading.module.scss";
import { sortChapters } from "services/chapter";
import GGPlay from "./assets/images/icons8-google-play-48.png";
import {
  ReadingComics,
  ReadingControls,
  ReadingPagination,
} from "./components";

const cx = classNames.bind(styles);

function Reading() {
  const { chapterId } = useParams();
  const { titleId } = useParams();
  const { chapters } = sortChapters(titleId, "order");
  const chapter = chapters.find((chapt) => {
    return chapterId === chapt.id;
  });

  return (
    <>
      {chapters.length > 0 && (
        <div className={cx("reading-page")}>
          <ReadingComics cx={cx} images={chapter.contents} />
          <ReadingControls cx={cx} GGPlay={GGPlay} />
          <ReadingPagination
            titleId={titleId}
            chapterId={parseInt(chapterId, 10)}
            chapters={chapters}
          />
          <Recommend />
        </div>
      )}
      {}
    </>
  );
}

export default Reading;
