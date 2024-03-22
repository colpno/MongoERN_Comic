import moment from "moment";
import PropTypes from "prop-types";
import { useMemo } from "react";

import { Table } from "components";

const getHeaders = (cx) => [
  {
    headerName: "Truyện",
    field: "title",
    flex: 1,
    valueGetter: ({ row }) => row.title_id.title,
    renderCell: ({ row }) => {
      const { title_id: titleID, chapter_id: chapterID } = row;
      const { cover, title: comicTitle } = titleID;
      const { order, title: chapterTitle } = chapterID;

      return (
        <div className={cx("transaction__container__content")}>
          <div className={cx("box-img")}>
            <img src={cover.source} alt={comicTitle} />
          </div>
          <div>
            <p className={cx("title")}>{comicTitle}</p>
            <p className={cx("author")}>
              Chương {order}
              {chapterTitle ? `: ${chapterTitle}` : ""}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    headerName: "Hạn thuê",
    field: "expiredAt",
    maxWidth: 300,
    minWidth: 250,
    headerAlign: "center",
    align: "center",
    renderCell: ({ value }) => <span>{moment(value).format("DD.MM.YYYY hh:mm:ss")}</span>,
  },
  {
    headerName: "Thời gian thuê",
    field: "createdAt",
    maxWidth: 300,
    minWidth: 250,
    headerAlign: "center",
    align: "center",
    renderCell: ({ value }) => <span>{moment(value).format("DD.MM.YYYY hh:mm:ss")}</span>,
  },
];

function HiredChaptersTable({ transactions, cx }) {
  const headers = useMemo(() => getHeaders(cx), []);
  const initialState = {
    sorting: {
      sortModel: [{ field: "expiredAt", sort: "asc" }],
    },
  };

  return (
    <Table
      headers={headers}
      data={transactions}
      height={700}
      rowHeight={100}
      initialState={initialState}
    />
  );
}

HiredChaptersTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  cx: PropTypes.func.isRequired,
};

export default HiredChaptersTable;
