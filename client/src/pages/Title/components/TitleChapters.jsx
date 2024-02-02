import classNames from "classnames/bind";
import { Button } from "components";
import { TITLE_PAGE_CHAPTERS_PER_PAGE } from "constants/paginate.constant.js";
import { NoData, Pagination } from "features";
import { useGetChapters, usePagination } from "hooks/index.jsx";
import { memo, useEffect, useState } from "react";
import { BsSortNumericDown, BsSortNumericUp } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../styles/ComicChapters.module.scss";
import TitleChapterList from "./TitleChapterList";

const cx = classNames.bind(styles);

function TitleChapters() {
  const title = useSelector((state) => state.title.title);
  const { titleId } = useParams();
  const [isDESCSort, setIsDESCSort] = useState(false);
  const { pagination, setPagination, setPaginationTotal } = usePagination(
    TITLE_PAGE_CHAPTERS_PER_PAGE
  );
  const { data: chapters = [], pagination: chapterPagination } = useGetChapters({
    params: {
      title_id: titleId,
      _sort: {
        order: isDESCSort ? -1 : 1,
      },
      _page: pagination.page,
      _limit: pagination.limit,
    },
    isPrivate: false,
  });

  const handleSort = () => {
    setIsDESCSort((prev) => !prev);
  };

  useEffect(() => {
    if (chapters.length > 0 && pagination.total !== 0) {
      setPaginationTotal(chapterPagination.total);
    }
  }, [chapters, chapterPagination]);

  if (!title) {
    return (
      <NoData>
        <h6>Không có truyện nào để hiển thị!</h6>
      </NoData>
    );
  }

  return (
    <>
      {chapters.length > 0 ? (
        <div className={cx("chapters")}>
          <div className={cx("chapters__head")}>
            <span className="chapters__head__total">
              Số chương hiện tại:
              <strong className={cx("chapters__head__total__number")}>{title.total_chapter}</strong>
            </span>
            <Button text className={cx("chapters__head__sorting")} onClick={handleSort}>
              {isDESCSort ? <BsSortNumericUp /> : <BsSortNumericDown />}
              <span>Sắp xếp</span>
            </Button>
          </div>
          <TitleChapterList chapters={chapters} title={title} />
          <Pagination pagination={pagination} setPagination={setPagination} />
        </div>
      ) : (
        <NoData>
          <h6>Hiện tại truyện không có chương nào!</h6>
          <small>Xin vui lòng chờ cập nhật!</small>
        </NoData>
      )}
      {}
    </>
  );
}

export default memo(TitleChapters);
