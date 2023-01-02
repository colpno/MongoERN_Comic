/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Recommend } from "features";
import { useToast } from "hooks";
import {
  setChapter as setChapterStore,
  setChapters as setChaptersStore,
} from "libs/redux/slices/readingChapter.slice";
import styles from "pages/Reading/assets/styles/Reading.module.scss";
import { chapterService, readingHistoryService } from "services";
import { ReadingComics, ReadingControls, ReadingPagination } from "./components";

const cx = classNames.bind(styles);

function Reading() {
  const dispatch = useDispatch();
  const { chapterId, titleId } = useParams();
  const isLoggingIn = useSelector((state) => state.user.isLoggingIn);
  const [chapter, setChapter] = useState({});
  const [chapters, setChapters] = useState([]);
  const { Toast, options, toastEmitter } = useToast();

  useEffect(() => {
    const chapterPromise = chapterService.getOne(chapterId, false);
    const chaptersPromise = chapterService.getAll(
      {
        titleId,
        _sort: "order",
        _order: "asc",
      },
      false
    );

    Promise.all([chapterPromise, chaptersPromise])
      .then(([chapterResponse, chaptersResponse]) => {
        setChapter(chapterResponse.data);
        setChapters(chaptersResponse.data);
      })
      .catch((error) => toastEmitter(error, "error"));
  }, []);

  useEffect(() => {
    chapter?._id && dispatch(setChapterStore(chapter));
  }, [chapter]);

  useEffect(() => {
    chapters.length > 0 && dispatch(setChaptersStore(chapters));
  }, [chapters]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // chapterService.update(chapterId, { view: 1 });
      // isLoggingIn && readingHistoryService.add(titleId, chapterId);
    }, 60 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <div className={cx("reading-page")}>
        {chapter?.contents?.length > 0 && <ReadingComics cx={cx} images={chapter.contents} />}
        <ReadingControls cx={cx} titleId={titleId} chapterId={chapterId} />
        {chapters.length > 0 && <ReadingPagination chapters={chapters} />}
        <Recommend />
      </div>
      <Toast {...options} />
    </>
  );
}

export default Reading;
