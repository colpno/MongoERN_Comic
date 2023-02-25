import { GridActionsCellItem, GRID_CHECKBOX_SELECTION_COL_DEF } from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { FaCommentDots } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { TbList } from "react-icons/tb";

import { circleC, circleP } from "assets/images";
import { Button, Table } from "components";
import { convertTimeLabel } from "constants/time.constant";
import { roundNumByUnit, replaceAll } from "utils";
import styles from "../styles/TitlesTable.module.scss";

const cx = classNames.bind(styles);

const getHeaders = (approvedStatusOptions, approvedStatuses) => {
  const navigate = useNavigate();
  return [
    {
      headerName: "Truyện",
      field: "title",
      maxWidth: 250,
      minWidth: 100,
      headerAlign: "center",
      resizable: true,
      renderCell: ({ row, value }) => (
        <div title={value} className={cx("title-wrapper")}>
          <div className={cx("box-img")}>
            <img src={row.cover.source} alt={value} />
          </div>
          <Button text to={`/comic/title/${row._id}`} title={value} className={cx("title")}>
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
      type: "singleSelect",
      valueOptions: approvedStatusOptions,
      width: 140,
      headerAlign: "center",
      align: "center",
      editable: true,
      valueGetter: ({ value }) => value._id || value,
      renderCell: ({ value }) => {
        const status = approvedStatuses.find((apdStat) => apdStat._id === value);
        return (
          <span
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
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            size="large"
            title="Xem danh sách chương"
            icon={<TbList />}
            label="Show chapters"
            onClick={() => {
              const { title } = row;
              const titleParam = replaceAll(title.toLowerCase(), /\s/, "-");
              const URLParam = `/chapters?title=${titleParam}`;
              navigate(URLParam);
            }}
          />,
        ];
      },
    },
  ];
};

function TitlesTable({ titles, approvedStatuses, onRowEditCommit }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "approved_status_id", sort: "asc" }],
    },
    pinnedColumns: { left: [GRID_CHECKBOX_SELECTION_COL_DEF.field, "title"], right: ["actions"] },
  };

  const approvedStatusOptions = useMemo(
    () =>
      approvedStatuses.map((status) => ({
        value: status._id,
        label: (
          <span
            style={{
              color: status.color.hex,
              fontWeight: 700,
            }}
          >
            {status.status}
          </span>
        ),
      })),
    [approvedStatuses]
  );

  const headers = getHeaders(approvedStatusOptions, approvedStatuses);

  return (
    <Table
      headers={headers}
      data={titles}
      hasToolbar
      rowHeight={100}
      height={700}
      initialState={initialState}
      onRowEditCommit={onRowEditCommit}
    />
  );
}

TitlesTable.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  approvedStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onRowEditCommit: PropTypes.func.isRequired,
};

export default memo(TitlesTable);
