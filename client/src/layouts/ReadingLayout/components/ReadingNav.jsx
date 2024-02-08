import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from "react-icons/io5";

import { Button } from "components";
import { useGetChapterTransactions } from "hooks/index.jsx";

function ReadingNav({ cx, chapter, totalChapter, titleId }) {
  const { data: chapterTransactions = [] } = useGetChapterTransactions({
    title_id: titleId,
    _embed: JSON.stringify([{ collection: "chapter_id", fields: "order" }]),
  });
  const [readLimit, setReadLimit] = useState(1);
  const canNext = chapter.order < readLimit || chapter.order >= totalChapter;

  useEffect(() => {
    if (chapterTransactions.length > 0) {
      const limit = chapterTransactions.reduce((previous, { chapter_id: chapterId }) => {
        if (chapterId.order > previous) return chapterId.order;
        return previous;
      }, chapterTransactions[0].chapter_id.order);
      setReadLimit(limit);
    }
  }, [chapterTransactions]);

  return (
    <div className={cx("reading-header__nav")}>
      <Button
        text
        to={`/comic/title/${titleId}/${chapter.order > 1 ? chapter.order - 1 : totalChapter}`}
        className={cx("reading-header__nav__left", chapter.order <= 1 ? "disabled" : "")}
      >
        <IoChevronBackCircleOutline />
      </Button>
      <span className={cx("reading-header__nav__title")} title={chapter.title}>
        {chapter.title}
      </span>
      <Button
        text
        to={
          canNext
            ? `/comic/title/${titleId}/${
                chapter.order < totalChapter ? chapter.order + 1 : totalChapter
              }`
            : undefined
        }
        className={cx("reading-header__nav__right", !canNext ? "disabled" : "")}
      >
        <IoChevronForwardCircleOutline />
      </Button>
    </div>
  );
}

ReadingNav.propTypes = {
  cx: PropTypes.func.isRequired,
  chapter: PropTypes.shape({
    order: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  totalChapter: PropTypes.number.isRequired,
  titleId: PropTypes.string.isRequired,
};

export default memo(ReadingNav);
