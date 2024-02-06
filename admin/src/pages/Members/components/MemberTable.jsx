import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { FaLock } from "react-icons/fa";
import { MdCheck } from "react-icons/md";

import { BuyTicket, circleC, circleP, RentTicket } from "assets/images";
import { Table } from "components";
import { separateNumberDigit } from "utils";
import styles from "../styles/MemberTable.module.scss";

const cx = classNames.bind(styles);

function MemberTable({ members, onUpdate }) {
  const initialState = {
    sorting: {
      sortModel: [{ field: "createdAt", sort: "desc" }],
    },
    pinnedColumns: { left: ["username"], right: ["actions"] },
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
          maxWidth: 250,
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
          field: "income",
          headerName: "Thu nhập (VNĐ)",
          width: 140,
          headerAlign: "center",
          align: "center",
          renderCell: ({ value }) => (
            <span title={`${separateNumberDigit(value)} VNĐ`}>{separateNumberDigit(value)} đ</span>
          ),
        },
        {
          field: "coin",
          headerName: "Coin",
          width: 100,
          headerAlign: "center",
          align: "right",
          renderCell: ({ value }) => (
            <div title={value} className={cx("coin-wrapper")}>
              <span>{value}</span>
              <img src={circleC} alt="coin" className={cx("icon", "coin-icon")} />
            </div>
          ),
        },
        {
          field: "point",
          headerName: "Point",
          width: 100,
          headerAlign: "center",
          align: "right",
          renderCell: ({ value }) => (
            <div title={value} className={cx("point-wrapper")}>
              <span>{value}</span>
              <img src={circleP} alt="point" className={cx("icon", "point-icon")} />
            </div>
          ),
        },
        {
          field: "ticket_for_buying",
          headerName: "Vé mua",
          width: 80,
          headerAlign: "center",
          align: "right",
          renderCell: ({ value }) => (
            <div title={value} className={cx("buy-ticket-wrapper")}>
              <span>{value}</span>
              <RentTicket className={cx("icon", "buy-ticket-icon")} />
            </div>
          ),
        },
        {
          field: "ticket_for_renting",
          headerName: "Vé thuê",
          width: 80,
          headerAlign: "center",
          align: "right",
          renderCell: ({ value }) => (
            <div title={value} className={cx("rent-ticket-wrapper")}>
              <span>{value}</span>
              <BuyTicket className={cx("icon", "rent-ticket-icon")} />
            </div>
          ),
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
      data={members}
      hasToolbar
      height={700}
      rowHeight={100}
      initialState={initialState}
      allowEdit
      onUpdate={onUpdate}
    />
  );
}

MemberTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default MemberTable;
