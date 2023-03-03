import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { BiBookmark } from "react-icons/bi";

import { Table } from "components";
import styles from "../styles/ReadingHistoryTable.module.scss";

const cx = classNames.bind(styles);

const headers = [
  {
    headerName: "Các nội dung được đọc gần đây nhất",
    field: "title_id",
    flex: 1,
    minWidth: 300,
    valueGetter: ({ row }) => row.title_id.title,
    renderCell: ({ row }) => (
      <div className={cx("reading-history__container__content__title-info")}>
        <div className={cx("box-img")} title={row.title_id.title}>
          <img
            src={row.title_id.cover.source}
            alt={row.title_id.title}
            className={cx("cover-image")}
          />
        </div>
        <div>
          <p className={cx("title")} title={row.title_id.title}>
            {row.title_id.title}
          </p>
          <p className={cx("chapter-number")} title={row.chapter_id.title}>
            <BiBookmark className={cx("bookmark-icon")} />
            Chương: {row.chapter_id.title}
          </p>
        </div>
      </div>
    ),
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
      hasToolbar
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
