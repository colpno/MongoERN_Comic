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
    renderCell: ({ row }) => (
      <div className={cx("transaction__container__content")}>
        <div className={cx("box-img")}>
          <img src={row.title_id.cover.source} alt={row.title_id.title} />
        </div>
        <div>
          <p className={cx("title")}>{row.title_id.title}</p>
          <p className={cx("author")}>{row.chapter_id.title}</p>
        </div>
      </div>
    ),
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

  return <Table headers={headers} data={transactions} hasToolbar autoHeight rowHeight={100} />;
}

HiredChaptersTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  cx: PropTypes.func.isRequired,
};

export default HiredChaptersTable;
