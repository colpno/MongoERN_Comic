import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { memo } from "react";
import { BsEyeFill } from "react-icons/bs";
import { TiThList } from "react-icons/ti";
import { FaCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { circleC, circleP } from "assets/images";
import { Button, Table } from "components";
import { convertTimeLabel } from "constants/time.constant";
import { roundNumByUnit } from "utils";
import styles from "../styles/MyTitleTable.module.scss";

const cx = classNames.bind(styles);

const headers = [
  {
    headerName: "Truyện",
    field: "title",
    maxWidth: 250,
    minWidth: 250,
    headerAlign: "center",
    resizable: true,
    renderCell: ({ row, value }) => (
      <div title={value} className={cx("title-wrapper")}>
        <div className={cx("box-img")}>
          <img src={row.cover.source} alt={value} />
        </div>
        <Button text to={`/comic/title/${row._id}`} className={cx("title")}>
          {value}
        </Button>
      </div>
    ),
  },
  {
    headerName: "Trạng thái",
    field: "status_id",
    width: 140,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => value.status,
  },
  {
    headerName: "Duyệt",
    field: "approved_status_id",
    width: 140,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => value.status,
    renderCell: ({ row, value }) => (
      <span style={{ color: row.approved_status_id.color.hex, fontWeight: 700 }}>{value}</span>
    ),
  },
  {
    headerName: "Ngày ra chương",
    field: "release_day",
    width: 140,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => convertTimeLabel(value, "shortLabel", "label"),
    renderCell: ({ value }) => <span title={value}>{value}</span>,
  },
  {
    headerName: "Tác giả",
    field: "author",
    width: 140,
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Thể loại",
    field: "genres",
    width: 140,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => value.join(", "),
  },
  {
    headerName: "Tổng chương",
    field: "total_chapter",
    minWidth: 80,
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Coin",
    field: "coin",
    width: 80,
    headerAlign: "center",
    align: "right",
    renderCell: ({ value }) => (
      <>
        <span>{value}</span>
        <img src={circleC} alt="coin" className={cx("icon", "coin-icon")} />
      </>
    ),
  },
  {
    headerName: "Point",
    field: "point",
    width: 80,
    headerAlign: "center",
    align: "right",
    renderCell: ({ value }) => (
      <>
        <span>{value}</span>
        <img src={circleP} alt="point" className={cx("icon", "point-icon")} />
      </>
    ),
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
    headerName: "Số bình luận",
    field: "comment_num",
    width: 80,
    headerAlign: "center",
    align: "right",
    renderCell: ({ value }) => (
      <div title={value} className={cx("number-wrapper")}>
        <span>{roundNumByUnit(value)}</span>
        <FaCommentDots className={cx("icon", "comment-icon")} />
      </div>
    ),
  },
  {
    headerName: "Tóm tắt",
    field: "summary",
    width: 300,
    headerAlign: "center",
    sortable: false,
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

function MyTitleTable({ titles }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "approved_status_id", sort: "asc" }],
    },
    pinnedColumns: { left: ["title"], right: ["actions"] },
  };
  const customAction = ({ row }) => {
    const navigate = useNavigate();
    return [
      <GridActionsCellItem
        icon={<MdEdit />}
        onClick={() => navigate(`update/${row._id}`)}
        label="Update"
        title="Cập nhật"
      />,
      <GridActionsCellItem
        icon={<TiThList />}
        onClick={() => navigate(row._id)}
        label="Show chapters"
        title="Danh sách chương và thao tác với truyện"
      />,
    ];
  };

  return (
    <Table
      headers={headers}
      data={titles}
      hasToolbar
      height={700}
      rowHeight={100}
      initialState={initialState}
      customAction={customAction}
    />
  );
}

MyTitleTable.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default memo(MyTitleTable);
