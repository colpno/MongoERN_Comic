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
import { chapterService, chapterTransactionService, readingHistoryService } from "services";
import { ReadingComics, ReadingControls, ReadingPagination } from "./components";

const cx = classNames.bind(styles);

function Reading() {
  const dispatch = useDispatch();
  const { titleId, page = 1 } = useParams();
  const { isLoggingIn, user } = useSelector((state) => state.user);
  const [chapter, setChapter] = useState({});
  const [chapters, setChapters] = useState([]);
  const [boughtChapter, setBoughtChapter] = useState([]);
  const { Toast, options, toastEmitter } = useToast();
  // TODO: loading

  useEffect(() => {
    const chapterTranParams = {
      title_id: titleId,
      _embed: JSON.stringify([{ collection: "chapter_id", fields: "_id" }]),
    };

    const chapterPromise = chapterService.getAll(
      {
        title_id: titleId,
        order: page,
      },
      false
    );
    const chaptersPromise = chapterService.getAll(
      {
        title_id: titleId,
        _sort: "order",
        _order: "asc",
      },
      false
    );
    const chapterTransactionPromise = chapterTransactionService.getAll(
      chapterTranParams,
      !!user._id
    );

    Promise.all([chapterPromise, chaptersPromise, chapterTransactionPromise])
      .then(([chapterResponse, chaptersResponse, chapterTransactionResult]) => {
        setChapter(chapterResponse.data[0]);
        setChapters(chaptersResponse.data);
        dispatch(setChapterStore(chapterResponse.data[0]));
        dispatch(setChaptersStore(chaptersResponse.data));

        setBoughtChapter(
          chapterTransactionResult.data.map((transaction) => transaction.chapter_id)
        );
      })
      .catch((error) => toastEmitter(error, "error"));
  }, [page]);

  useEffect(() => {
    let timeout;
    if (chapter._id) {
      timeout = setTimeout(() => {
        chapterService.update(chapter._id, { view: 1 });
        isLoggingIn && readingHistoryService.add(titleId, chapter._id);
      }, 120 * 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [chapter]);

  return (
    <>
      <div className={cx("reading-page")}>
        {chapter?.contents?.length > 0 && <ReadingComics cx={cx} images={chapter.contents} />}
        {chapter?._id && <ReadingControls cx={cx} titleId={titleId} chapterId={chapter._id} />}
        {chapters.length > 0 && (
          <ReadingPagination chapters={chapters} boughtChapter={boughtChapter} />
        )}
        <Recommend />
      </div>
      <Toast {...options} />
    </>
  );
}

export default Reading;
