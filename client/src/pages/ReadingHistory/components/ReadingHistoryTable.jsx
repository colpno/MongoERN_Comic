import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { BiBookmark } from "react-icons/bi";

import { Table } from "components";
import { isEmpty } from "utils/isEmpty.js";
import styles from "../styles/ReadingHistoryTable.module.scss";

const cx = classNames.bind(styles);

const headers = [
  {
    headerName: "Các nội dung được đọc gần đây nhất",
    field: "title_id",
    flex: 1,
    minWidth: 300,
    valueGetter: ({ row }) => row.title_id.title,
    renderCell: ({ row }) => {
      const { title_id: titleID, chapter_id: chapterID } = row;
      const { title: comicTitle, cover } = titleID;
      const { title: chapterTitle, order } = chapterID;

      return (
        <div className={cx("reading-history__container__content__title-info")}>
          <div className={cx("box-img")} title={comicTitle}>
            <img src={cover.source} alt={comicTitle} className={cx("cover-image")} />
          </div>
          <div>
            <p className={cx("title")} title={comicTitle}>
              {comicTitle}
            </p>
            <p className={cx("chapter-number")} title={chapterTitle}>
              <BiBookmark className={cx("bookmark-icon")} />
              Chương {order}
              {!isEmpty(chapterTitle) ? `: ${chapterTitle}` : ""}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    headerName: "Ngày đọc",
    field: "updatedAt",
    maxWidth: 400,
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    renderCell: ({ value }) => <span>Đọc cách đây {moment(value).fromNow(true)}</span>,
  },
];

function ReadingHistoryTable({ readingHistories }) {
  const initialTableState = {
    sorting: {
      sortModel: [{ field: "updatedAt", sort: "desc" }],
    },
  };

  return (
    <Table
      headers={headers}
      data={readingHistories}
      height={700}
      rowHeight={100}
      initialState={initialTableState}
    />
  );
}

ReadingHistoryTable.propTypes = {
  readingHistories: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default ReadingHistoryTable;
