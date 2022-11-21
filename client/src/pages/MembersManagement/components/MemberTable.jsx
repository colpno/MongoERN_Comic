import React from "react";
import PropTypes from "prop-types";
import { GridTable } from "components";
import { Pagination } from "features";
import MemberTableRow from "./MemberTableRow";

function MemberTable({
  members,
  popup,
  pagination,
  setPagination,
  sorting,
  setPopup,
  setDeleteItem,
  setUpdate,
  setShowForm,
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
        <MemberTableRow
          members={members}
          popup={popup}
          setPopup={setPopup}
          setDeleteItem={setDeleteItem}
          setUpdate={setUpdate}
          setShowForm={setShowForm}
        />
      </GridTable>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </>
  );
}

MemberTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  popup: PropTypes.shape({}).isRequired,
  setPopup: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.func.isRequired,
  setDeleteItem: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default MemberTable;
