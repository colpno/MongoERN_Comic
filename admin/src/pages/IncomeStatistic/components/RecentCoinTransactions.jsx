import moment from "moment";
import PropTypes from "prop-types";

import { Table } from "components";

function RecentCoinTransactions({ cx, transactions }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "createdAt", sort: "desc" }],
    },
  };

  return (
    <Table
      headers={[
        {
          field: "user_id.username",
          headerName: "Người mua",
        },
        {
          field: "payment_method",
          headerName: "Phương thức",
          headerAlign: "center",
          align: "center",
        },
        {
          field: "amount",
          headerName: "Số lượng",
          headerAlign: "center",
          align: "center",
          width: 80,
        },
        {
          field: "createdAt",
          headerName: "Ngày tạo",
          width: 140,
          align: "center",
          headerAlign: "center",
          renderCell: ({ value }) => (
            <span className={cx("timestamp")}>{moment(value).format("DD.MM.YYYY")}</span>
          ),
        },
      ]}
      data={transactions}
      hasToolbar
      height={400}
      rowHeight={100}
      initialState={initialState}
    />
  );
}

RecentCoinTransactions.propTypes = {
  cx: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default RecentCoinTransactions;
