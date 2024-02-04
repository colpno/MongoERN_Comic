import { circleC, circleP } from "assets/images";
import classNames from "classnames/bind";
import { FloatingContainer, Table } from "components";
import { useGetTransactions } from "hooks/index";
import moment from "moment";
import styles from "../styles/TradingStatistic.module.scss";

const cx = classNames.bind(styles);

const renderUnit = (unit) => {
  switch (unit) {
    case "coin":
      return (
        <div title={unit} className={cx("unit")}>
          <img src={circleC} alt="coin logo" />
          <span>{unit}</span>
        </div>
      );
    case "point":
      return (
        <div title={unit} className={cx("unit")}>
          <img src={circleP} alt="point logo" />
          <span>{unit}</span>
        </div>
      );
    default:
      return unit;
  }
};

function TransactionStat() {
  const { data: transactions } = useGetTransactions({
    _embed: JSON.stringify([{ collection: "user_id", field: "username" }]),
  });
  const initialState = {
    sorting: {
      sortModel: [{ field: "updatedAt", sort: "desc" }],
    },
  };

  return (
    <>
      <div className={cx("selector-container")}>
        <h4>Giao dịch</h4>
      </div>
      <FloatingContainer>
        <Table
          headers={[
            {
              field: "user_id",
              headerName: "Tài khoản",
              width: 140,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value }) => <span title={value.username}>{value.username}</span>,
            },
            {
              field: "amount",
              headerName: "Số lượng",
              width: 140,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value }) => (
                <span className={`${cx("amount", value < 0 && "minus")} bold`} title={value}>
                  {value > 0 ? `+${value}` : value}
                </span>
              ),
            },
            {
              field: "unit",
              headerName: "Đơn vị",
              width: 140,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value }) => renderUnit(value),
            },
            {
              field: "method",
              headerName: "Phương thức",
              width: 200,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value }) => <span title={value}>{value}</span>,
            },
            {
              field: "updatedAt",
              headerName: "Thời gian",
              width: 140,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value }) => (
                <span className="timestamp">{moment(value).format("DD.MM.YYYY")}</span>
              ),
            },
          ]}
          data={transactions}
          hasToolbar
          height={700}
          rowHeight={100}
          initialState={initialState}
        />
      </FloatingContainer>
    </>
  );
}

export default TransactionStat;
