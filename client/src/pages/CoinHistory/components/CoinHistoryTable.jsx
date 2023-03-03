import moment from "moment";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { Table } from "components";
import { CircleC } from "assets/images";
import styles from "../styles/CoinHistoryTable.module.scss";

const cx = classNames.bind(styles);

function CoinHistoryTable({ histories }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "createdAt", sort: "desc" }],
    },
  };

  return (
    <Table
      headers={[
        {
          field: "payment_method",
          headerName: "Nội dung",
          flex: 1,
          minWidth: 300,
          headerAlign: "center",
          align: "center",
          renderCell: ({ row }) => {
            const isPositive = row.amount >= 0;
            return (
              <h5>
                {isPositive ? "Nhận" : "Trừ"} coin {isPositive ? "từ" : "bởi"} {row.payment_method}
              </h5>
            );
          },
        },
        {
          field: "createdAt",
          headerName: "Thời gian ghi lại",
          width: 200,
          headerAlign: "center",
          align: "center",
          renderCell: ({ value }) => moment(value).format("DD/MM/YYYY hh:mm:ss"),
        },
        {
          field: "amount",
          headerName: "Số lượng",
          width: 200,
          headerAlign: "center",
          align: "center",
          renderCell: ({ value }) => {
            const isPositive = value >= 0;
            return (
              <>
                <strong className={cx("quantity", isPositive ? "green" : "red")}>
                  {isPositive ? `+${value}` : value}
                </strong>
                <CircleC className={cx("icon")} />
              </>
            );
          },
        },
      ]}
      data={histories}
      initialState={initialState}
      height={700}
      hasToolbar
    />
  );
}

CoinHistoryTable.propTypes = {
  histories: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default CoinHistoryTable;
