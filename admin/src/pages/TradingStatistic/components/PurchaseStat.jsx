import { circleC, circleP } from "assets/images";
import classNames from "classnames/bind";
import { FloatingContainer, Table } from "components";
import { useGetChapterTransactions } from "hooks/index";
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

function PurchaseStat() {
  const { data: chapterTransactions } = useGetChapterTransactions({
    _embed: JSON.stringify([
      { collection: "user_id", field: "-_id username" },
      { collection: "title_id", field: "-_id title" },
      { collection: "chapter_id", field: "-_id title" },
    ]),
  });
  const initialState = {
    sorting: {
      sortModel: [{ field: "createdAt", sort: "desc" }],
    },
  };

  return (
    <>
      <div className={cx("selector-container")}>
        <h4>Giao dịch truyện</h4>
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
              field: "title_id",
              headerName: "Truyện",
              width: 300,
              headerAlign: "center",
              align: "left",
              renderCell: ({ value }) => <span title={value.title}>{value.title}</span>,
            },
            {
              field: "chapter_id",
              headerName: "Chương",
              width: 200,
              headerAlign: "center",
              align: "left",
              renderCell: ({ value }) => (
                <span title={`Chương ${value.order}${value.title ? `: ${value.title}` : ""}`}>
                  {`Chương ${value.order}${value.title ? `: ${value.title}` : ""}`}
                </span>
              ),
            },
            {
              field: "method",
              headerName: "Phương thức",
              width: 140,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value }) => renderUnit(value),
            },
            {
              field: "cost",
              headerName: "Số lượng",
              width: 140,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value }) => (
                <span className={cx("amount")} title={value}>
                  {value > 0 ? `+${value}` : value}
                </span>
              ),
            },
            {
              field: "createdAt",
              headerName: "Ngày giao dịch",
              width: 140,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value }) => (
                <span className="timestamp">{moment(value).format("DD.MM.YYYY")}</span>
              ),
            },
          ]}
          data={chapterTransactions}
          hasToolbar
          height={700}
          rowHeight={100}
          initialState={initialState}
        />
      </FloatingContainer>
    </>
  );
}

export default PurchaseStat;
