/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import chapterApi from "api/chapterApi";
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
  const chapterId = parseInt(useParams().chapterId, 10);
  const { titleId } = useParams();
  const [chapters, setChapters] = useState([]);
  const chapter = chapters.find((chapt) => {
    return chapterId === chapt.id;
  });

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await chapterApi.sort(1, {
          key: "order",
          order: "asc",
        });
        setChapters(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchChapters();
  }, []);

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
