import { GRID_CHECKBOX_SELECTION_COL_DEF, GridActionsCellItem } from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";

import { Table } from "components";
import styles from "../styles/StatusTable.module.scss";

const cx = classNames.bind(styles);

function ApprovedStatusTable({ statuses, onDelete, onUpdate, onAdd }) {
  const initialState = {
    pinnedColumns: { left: [GRID_CHECKBOX_SELECTION_COL_DEF.field, "status"], right: ["actions"] },
  };

  return (
    <Table
      headers={[
        {
          field: "status",
          headerName: "Tên trạng thái",
          align: "center",
          headerAlign: "center",
          flex: 1,
          minWidth: 200,
          editable: true,
          renderCell: ({ value }) => (
            <span className="bold" title={value}>
              {value}
            </span>
          ),
        },
        {
          field: "code",
          headerName: "Viết tắt (3 ký tự)",
          align: "center",
          headerAlign: "center",
          width: 140,
          editable: true,
          renderCell: ({ value }) => (
            <span className="bold" title={value}>
              {value}
            </span>
          ),
        },
        {
          field: "createdAt",
          headerName: "Ngày tạo",
          align: "center",
          width: 140,
          headerAlign: "center",
          renderCell: ({ value }) => (
            <span className={cx("timestamp")}>{moment(value).format("DD.MM.YYYY")}</span>
          ),
        },
        {
          field: "updatedAt",
          headerName: "Ngày sửa",
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
          getActions: ({ row }) => [
            <GridActionsCellItem
              size="large"
              icon={<FaTrash />}
              label="Delete"
              onClick={() => onDelete(row._id)}
            />,
          ],
        },
      ]}
      data={statuses}
      hasToolbar
      height={700}
      rowHeight={100}
      initialState={initialState}
      checkboxSelection
      onMultiDelete={onDelete}
      onRowEditCommit={onUpdate}
      allowAdd
      allowDelete
      allowEdit
      onDelete={onDelete}
      onUpdate={onUpdate}
      onAdd={onAdd}
    />
  );
}

ApprovedStatusTable.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ApprovedStatusTable;
