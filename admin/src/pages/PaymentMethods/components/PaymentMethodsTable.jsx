import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { HiOutlinePencil } from "react-icons/hi";

import { Table } from "components";
import styles from "../styles/PaymentMethodsTable.module.scss";

const cx = classNames.bind(styles);

function PaymentMethodsTable({ paymentMethods }) {
  const initialState = {
    pinnedColumns: { left: ["name"], right: ["actions"] },
  };

  return (
    <Table
      headers={[
        { field: "name", headerName: "Phương thức" },
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
          getActions: () => {
            return [<GridActionsCellItem icon={<HiOutlinePencil />} label="Update" />];
          },
        },
      ]}
      data={paymentMethods}
      hasToolbar
      autoHeight
      rowHeight={100}
      initialState={initialState}
    />
  );
}

PaymentMethodsTable.propTypes = {
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default PaymentMethodsTable;
