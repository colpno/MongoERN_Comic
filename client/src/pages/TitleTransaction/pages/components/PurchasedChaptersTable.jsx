import PropTypes from "prop-types";
import moment from "moment";
import { useMemo } from "react";

import { Table } from "components";
import { CircleC } from "assets/images";

const getHeaders = (cx) => {
  return [
    {
      headerName: "Truyện",
      field: "chapter_id",
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
      width: 140,
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
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => <span>{moment(value).format("DD.MM.YYYY hh:mm:ss")}</span>,
    },
  ];
};

function PurchasedChaptersTable({ transactions, cx }) {
  const headers = useMemo(() => getHeaders(cx), []);
  const initialState = {
    sorting: {
      sortModel: [{ field: "createdAt", sort: "desc" }],
    },
  };

  return (
    <Table
      headers={headers}
      data={transactions}
      hasToolbar
      height={700}
      rowHeight={100}
      initialState={initialState}
    />
  );
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
