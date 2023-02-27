import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { FaLock } from "react-icons/fa";
import { MdCheck } from "react-icons/md";

import { cat1 } from "assets/images";
import { Table } from "components";
import styles from "../styles/AdminTable.module.scss";

const cx = classNames.bind(styles);

function AdminTable({ admins, onDelete, onAdd, onUpdate }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "createdAt", sort: "desc" }],
    },
    pinnedColumns: { right: ["actions"] },
  };

  const initNewDataFields = {
    username: "",
    password: "",
    role: "administrator",
    email: "",
    avatar: cat1,
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
          editable: true,
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
          field: "password",
          headerName: "Mật khẩu",
          headerAlign: "center",
          width: 140,
          editable: true,
        },
        {
          field: "email",
          headerName: "Email",
          headerAlign: "center",
          width: 140,
          editable: true,
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
      ]}
      data={admins}
      hasToolbar
      height={700}
      rowHeight={100}
      initialState={initialState}
      allowAdd
      onAdd={onAdd}
      initialNewDataFields={initNewDataFields}
      allowEdit
      onUpdate={onUpdate}
      allowDelete
      checkboxSelection
      onMultiDelete={onDelete}
    />
  );
}

AdminTable.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AdminTable;
