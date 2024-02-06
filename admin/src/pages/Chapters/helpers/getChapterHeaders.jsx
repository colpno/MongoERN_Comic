import classNames from "classnames/bind";
import moment from "moment";
import { BsCurrencyDollar, BsEyeFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { roundNumByUnit } from "utils";
import styles from "../styles/ChaptersTable.module.scss";

const cx = classNames.bind(styles);

export const getChapterHeaders = () => {
  return [
    {
      headerName: "Chương",
      field: "order",
      width: 60,
      headerAlign: "center",
      align: "center",
    },
    {
      headerName: "Tên",
      field: "title",
      maxWidth: 350,
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row }) => (
        <>
          <div className={cx("box-img")} title={row.title}>
            <img src={row.cover.source} alt={row.title} />
          </div>
          <span className={cx("title")} title={row.title}>
            {row.title}
          </span>
        </>
      ),
    },
    {
      headerName: "Trạng thái",
      field: "status_id",
      width: 140,
      headerAlign: "center",
      align: "center",
      valueGetter: ({ value }) => value._id || value,
      renderCell: ({ row: { status_id: status } }) => {
        return (
          <span
            title={status.status}
            style={{
              color: status.color.hex,
              fontWeight: 700,
            }}
          >
            {status.status}
          </span>
        );
      },
    },
    {
      headerName: "Trả phí",
      field: "cost",
      type: "boolean",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => {
        if (value) return <BsCurrencyDollar className={cx("dollar-icon")} />;
        return <span />;
      },
    },
    {
      headerName: "Lượt thích",
      field: "like",
      width: 80,
      headerAlign: "center",
      align: "right",
      renderCell: ({ value }) => (
        <div title={value} className={cx("number-wrapper")}>
          <span>{roundNumByUnit(value)}</span>
          <FcLike className={cx("icon", "like-icon")} />
        </div>
      ),
    },
    {
      headerName: "Lượt xem",
      field: "view",
      width: 80,
      headerAlign: "center",
      align: "right",
      renderCell: ({ value }) => (
        <div title={value} className={cx("number-wrapper")}>
          <span>{roundNumByUnit(value)}</span>
          <BsEyeFill className={cx("icon", "view-icon")} />
        </div>
      ),
    },
    {
      headerName: "Ngày tạo",
      field: "createdAt",
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: ({ value }) => (
        <span className={cx("timestamp")}>{moment(value).format("DD.MM.YYYY")}</span>
      ),
    },
    {
      headerName: "Ngày sửa",
      field: "updatedAt",
      align: "center",
      width: 140,
      headerAlign: "center",
      renderCell: ({ value }) => (
        <span className={cx("timestamp")}>{moment(value).format("DD.MM.YYYY")}</span>
      ),
    },
  ];
};
