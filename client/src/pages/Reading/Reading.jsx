import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Recommend } from "features";
import {
  useAddReadingHistory,
  useLazyGetChapterTransactions,
  useLazyGetChapters,
  useUpdateChapter,
} from "hooks/index.jsx";
import {
  setChapter as setChapterStore,
  setChapters as setChaptersStore,
} from "libs/redux/slices/readingChapter.slice";
import styles from "pages/Reading/assets/styles/Reading.module.scss";
import { ReadingComics, ReadingControls, ReadingPagination } from "./components";

const cx = classNames.bind(styles);

function Reading() {
  const dispatch = useDispatch();
  const { titleId, page = 1 } = useParams();
  const { isLoggingIn, user } = useSelector((state) => state.user);
  const [chapter, setChapter] = useState({});
  const { get: getChapters, data: chapters = [] } = useLazyGetChapters();
  const { get: getChapterTransactions, data: boughtChapter = [] } = useLazyGetChapterTransactions();
  const { update: updateChapter } = useUpdateChapter();
  const { add: addReadingHistory } = useAddReadingHistory();

  useEffect(() => {
    getChapters({
      params: {
        title_id: titleId,
        order: page,
      },
      isPrivate: false,
    })
      .unwrap()
      .then((response) => {
        setChapter(response[0]);
      });
    getChapters({
      params: {
        title_id: titleId,
        _sort: "order",
        _order: "asc",
      },
      isPrivate: false,
    });
    getChapterTransactions({
      params: {
        title_id: titleId,
        _embed: JSON.stringify([{ collection: "chapter_id", fields: "_id" }]),
      },
      isPrivate: !!user._id,
    });
  }, [page]);

  useEffect(() => {
    dispatch(setChapterStore(chapter));
  }, [chapter]);

  useEffect(() => {
    dispatch(setChaptersStore(chapters));
  }, [chapters]);

  useEffect(() => {
    let timeout;
    if (chapter._id) {
      timeout = setTimeout(() => {
        updateChapter({ id: chapter._id, data: { view: 1 } });
        isLoggingIn && addReadingHistory({ titleId, chapterId: chapter._id });
      }, 120 * 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [chapter]);

  return (
    <div className={cx("reading-page")}>
      {chapter.contents?.length > 0 && <ReadingComics cx={cx} images={chapter.contents} />}
      {chapter._id && <ReadingControls cx={cx} titleId={titleId} chapterId={chapter._id} />}
      {chapters.length > 0 && (
        <ReadingPagination chapters={chapters} boughtChapter={boughtChapter} user={user} />
      )}
      <Recommend />
    </div>
  );
}

export default Reading;
