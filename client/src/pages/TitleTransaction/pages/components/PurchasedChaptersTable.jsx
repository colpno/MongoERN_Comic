import PropTypes from "prop-types";
import moment from "moment";
import { useMemo } from "react";

import { Table } from "components";
import { CircleC } from "assets/images";

const getHeaders = (cx) => {
  return [
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
            <p className={cx("chapter")}>{row.chapter_id.title}</p>
          </div>
        </div>
      ),
    },
    {
      headerName: "Chi phí",
      field: "cost",
      maxWidth: 120,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => (
        <>
          <span className={cx("cost")}>{value}</span>
          <CircleC />
        </>
      ),
    },
    {
      headerName: "Thời gian mua",
      field: "createdAt",
      maxWidth: 300,
      minWidth: 250,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => <span>{moment(value).format("DD.MM.YYYY hh:mm:ss")}</span>,
    },
  ];
};

function PurchasedChaptersTable({ transactions, cx }) {
  const headers = useMemo(() => getHeaders(cx), []);
  return <Table headers={headers} data={transactions} hasToolbar autoHeight rowHeight={100} />;
}

PurchasedChaptersTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      title_id: PropTypes.shape({
        cover: PropTypes.shape({
          source: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
      chapter_id: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  cx: PropTypes.func.isRequired,
};

export default PurchasedChaptersTable;
