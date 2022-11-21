import React from "react";
import PropTypes from "prop-types";
import { GridTable } from "components";
import { Pagination } from "features";
import AdminTableRow from "./AdminTableRow";

function AdminTable({
  admins,
  setPopup,
  pagination,
  setPagination,
  sorting,
  setDeletedItem,
}) {
  return (
    <>
      <GridTable
        head={[
          { label: "#", name: "id", sm: 1 },
          { label: "Tên", name: "username" },
          // { label: "Coin", name: "coin" },
          // { label: "Thu nhập (VNĐ)", name: "income" },
          // { label: "Point", name: "point" },
          // { label: "Vé mua", name: "buyTicket" },
          // { label: "Vé thuê", name: "rentTicket" },
          { label: "Ngày tạo", name: "createdAt" },
          { label: "Ngày sửa", name: "updatedAt" },
          { label: "", sm: 1 },
        ]}
        sorting={sorting}
      >
        <AdminTableRow
          admins={admins}
          setPopup={setPopup}
          setDeletedItem={setDeletedItem}
        />
      </GridTable>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </>
  );
}

AdminTable.propTypes = {
  admins: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  setPopup: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.func.isRequired,
  setDeletedItem: PropTypes.func.isRequired,
};

export default AdminTable;
