import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { memo } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { TbList } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

import { Button, Table } from "components";
import { convertTimeLabel } from "constants/time.constant";
import styles from "../styles/MyTitleTable.module.scss";

const cx = classNames.bind(styles);

const headers = [
  {
    headerName: "Truyện",
    field: "title",
    width: 350,
    minWidth: 350,
    headerAlign: "center",
    renderCell: ({ row }) => (
      <>
        <div className={cx("box-img")}>
          <img src={row.cover.source} alt={row.title} />
        </div>
        <Button text to={`/comic/title/${row._id}`} className={cx("title")}>
          {row.title}
        </Button>
      </>
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
    renderCell: ({ value }) => <span>{convertTimeLabel(value, "shortLabel", "label")}</span>,
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
    align: "center",
  },
  {
    headerName: "Point",
    field: "point",
    width: 80,
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Lượt thích",
    field: "like",
    width: 80,
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Lượt xem",
    field: "view",
    width: 80,
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Số bình luận",
    field: "comment_num",
    width: 80,
    headerAlign: "center",
    align: "center",
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
  {
    field: "actions",
    type: "actions",
    getActions: ({ row }) => {
      const navigate = useNavigate();

      return [
        <GridActionsCellItem
          icon={<HiOutlinePencil />}
          onClick={() => navigate(`update/${row._id}`)}
          label="Update"
        />,
        <GridActionsCellItem
          icon={<TbList />}
          onClick={() => navigate(row._id)}
          label="Show chapters"
        />,
      ];
    },
  },
];

function MyTitleTable({ titles }) {
  return (
    <Table
      headers={headers}
      data={titles}
      hasToolbar
      autoHeight
      rowHeight={100}
      initialState={{
        sorting: {
          sortModel: [{ field: "approved_status_id", sort: "asc" }],
        },
        pinnedColumns: { left: ["title"], right: ["actions"] },
      }}
    />
  );
}

MyTitleTable.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default memo(MyTitleTable);
