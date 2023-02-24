import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import { useMemo } from "react";
import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { BsTrash } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { Button, Table } from "components";
import styles from "../styles/ChaptersTable.module.scss";

const cx = classNames.bind(styles);

const getHeaders = (onDelete) => [
  {
    headerName: "Thứ tự",
    field: "order",
    width: 60,
    headerAlign: "center",
    align: "center",
  },
  {
    headerName: "Chương",
    field: "title",
    width: 350,
    minWidth: 350,
    headerAlign: "center",
    renderCell: ({ row }) => (
      <>
        <div className={cx("box-img")}>
          <img src={row.cover.source} alt={row.title} />
        </div>
        <Button text to={`/comic/title/${row.title_id}/${row._id}`} className={cx("title")}>
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
    headerName: "Trả phí",
    field: "cost",
    type: "boolean",
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
        <GridActionsCellItem icon={<BsTrash />} onClick={() => onDelete(row._id)} label="Delete" />,
      ];
    },
  },
];

function ChapterTable({ chapters, onDelete }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "approved_status_id", sort: "asc" }],
    },
    pinnedColumns: { left: ["title"], right: ["actions"] },
  };

  const headers = useMemo(() => getHeaders(onDelete), []);

  return (
    <Table
      headers={headers}
      data={chapters}
      hasToolbar
      autoHeight
      rowHeight={100}
      initialState={initialState}
      onMultiDelete={onDelete}
    />
  );
}

ChapterTable.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ChapterTable;
