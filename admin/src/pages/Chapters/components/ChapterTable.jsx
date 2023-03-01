import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
import { BsCurrencyDollar, BsEyeFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";

import { Button, Table } from "components";
import { roundNumByUnit } from "utils";
import styles from "../styles/ChaptersTable.module.scss";

const cx = classNames.bind(styles);

function ChapterTable({ chapters, approvedStatuses, objectStatuses, onUpdate }) {
  const initialState = {
    sorting: {
      sortModel: [
        { field: "approved_status_id", sort: "asc" },
        { field: "order", sort: "desc" },
      ],
    },
    pinnedColumns: {
      left: ["title"],
      right: ["actions"],
    },
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

  const getObjectStatus = useCallback(
    (value) => {
      const objectStatus = objectStatuses.find((status) => status._id === value);
      return objectStatus;
    },
    [objectStatuses]
  );

  const getApprovedStatus = useCallback(
    (value) => {
      const status = approvedStatuses.find((apdStat) => apdStat._id === value);
      return status;
    },
    [approvedStatuses]
  );

  return (
    <Table
      headers={[
        {
          headerName: "#",
          field: "order",
          width: 60,
          headerAlign: "center",
          align: "center",
        },
        {
          headerName: "Chương",
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
              <Button
                text
                to={`/comic/title/${row.title_id}/${row._id}`}
                className={cx("title")}
                title={row.title}
              >
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
          valueGetter: ({ value }) => {
            if (value.status) return value.status;
            return getObjectStatus(value).status;
          },
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
            const status = getApprovedStatus(value);
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
      ]}
      data={chapters}
      hasToolbar
      height={700}
      rowHeight={100}
      initialState={initialState}
      allowEdit
      onUpdate={onUpdate}
    />
  );
}

ChapterTable.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  approvedStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  objectStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ChapterTable;
