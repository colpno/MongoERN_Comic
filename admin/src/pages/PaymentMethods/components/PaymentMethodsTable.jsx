import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import classNames from "classnames/bind";
import moment from "moment";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";

import { Table } from "components";
import styles from "../styles/PaymentMethodsTable.module.scss";

const cx = classNames.bind(styles);

function PaymentMethodsTable({ paymentMethods, onDelete, onUpdate }) {
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
      data={paymentMethods}
      hasToolbar
      height={700}
      rowHeight={100}
      initialState={initialState}
      checkboxSelection
      onMultiDelete={onDelete}
      onRowEditCommit={onUpdate}
    />
  );
}

PaymentMethodsTable.propTypes = {
  paymentMethods: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PaymentMethodsTable;
