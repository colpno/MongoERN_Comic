import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";

import { RentTicket } from "assets/images";
import { Table } from "components";
import styles from "../assets/styles/InventoryTable.module.scss";

const cx = classNames.bind(styles);

function InventoryTable({ hiredChapters }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "createdAt", sort: "desc" }],
    },
  };

  return (
    <Table
      headers={[
        {
          field: "chapter.title",
          headerName: "Chương",
          renderCell: ({ row }) => (
            <>
              <div className={cx("box-img")}>
                <img src={row.cover.source} alt={row.title} />
              </div>
              <span className={cx("chapter")}>{row.title}</span>
            </>
          ),
        },
        {
          field: "cost",
          headerName: "Số lượng",
          renderCell: ({ value }) => (
            <>
              <RentTicket />
              <strong className={cx("separate")}>x</strong>
              <strong className={cx("rent-quantity")}>{value}</strong>
            </>
          ),
        },
        {
          field: "createdAt",
          headerName: "Thời gian thuê",
          renderCell: ({ value }) => moment(value).format("DD.MM.YYYY"),
        },
        {
          field: "expiredAt",
          headerName: "Hạn đọc",
          renderCell: ({ value }) => moment(value).format("DD.MM.YYYY hh:mm"),
        },
      ]}
      data={hiredChapters}
      initialState={initialState}
      height={700}
    />
  );
}

InventoryTable.propTypes = {
  hiredChapters: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      expiredAt: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      chapter: PropTypes.shape({
        cover: PropTypes.shape({
          source: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
      cost: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default InventoryTable;
