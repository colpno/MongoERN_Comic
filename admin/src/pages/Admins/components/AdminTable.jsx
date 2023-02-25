import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { FaLock, FaTrash } from "react-icons/fa";
import { MdCheck } from "react-icons/md";

import { Table } from "components";
import styles from "../styles/AdminTable.module.scss";

const cx = classNames.bind(styles);

function AdminTable({ admins, onDelete, onUpdate }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "createdAt", sort: "desc" }],
    },
    pinnedColumns: { right: ["actions"] },
  };

  return (
    <Table
      headers={[
        {
          field: "username",
          headerName: "Tên",
          headerAlign: "center",
          flex: 1,
          minWidth: 200,
          renderCell: ({ row }) => {
            const { username, avatar } = row;
            return (
              <div title={username}>
                <img src={avatar} alt={`${username}'s avatar`} className={cx("avatar")} />
                <span className={cx("username")}>{username}</span>
              </div>
            );
          },
        },
        {
          field: "isBanned",
          headerName: "Khóa",
          type: "boolean",
          width: 80,
          headerAlign: "center",
          align: "center",
          editable: true,
          renderCell: ({ value }) => {
            if (value) return <FaLock className={cx("lock-icon")} />;
            return <span />;
          },
        },
        {
          field: "isActivated",
          headerName: "Kích hoạt",
          type: "boolean",
          width: 80,
          headerAlign: "center",
          align: "center",
          renderCell: ({ value }) => {
            if (value) return <MdCheck className={cx("activate-check-icon")} />;
            return <span />;
          },
        },
        {
          field: "role",
          headerName: "Vai trò",
          type: "singleSelect",
          valueOptions: ["administrator"],
          headerAlign: "center",
          align: "center",
          editable: true,
        },
        {
          field: "createdAt",
          headerName: "Ngày tạo",
          width: 140,
          headerAlign: "center",
          align: "center",
          renderCell: ({ value }) => (
            <span className="timestamp">{moment(value).format("DD.MM.YYYY")}</span>
          ),
        },
        {
          field: "updatedAt",
          headerName: "Ngày sửa",
          width: 140,
          headerAlign: "center",
          align: "center",
          renderCell: ({ value }) => (
            <span className="timestamp">{moment(value).format("DD.MM.YYYY")}</span>
          ),
        },
        {
          field: "actions",
          type: "actions",
          width: 80,
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
      data={admins}
      hasToolbar
      height={700}
      rowHeight={100}
      checkboxSelection
      initialState={initialState}
      onMultiDelete={onDelete}
      onRowEditCommit={onUpdate}
    />
  );
}

AdminTable.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AdminTable;
