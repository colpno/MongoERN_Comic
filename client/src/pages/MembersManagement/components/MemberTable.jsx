import React from "react";
import PropTypes from "prop-types";
import { GridTable } from "components";
import { Pagination } from "features";
import MemberTableRow from "./MemberTableRow";

function MemberTable({
  members,
  popup,
  setPopup,
  pagination,
  setPagination,
  sorting,
}) {
  return (
    <>
      <GridTable
        head={[
          { label: "#", name: "index", sm: 1 },
          { label: "Tên", name: "userName" },
          { label: "Coin", name: "coin" },
          { label: "Point", name: "point" },
          { label: "Vé mua", name: "buyTicket" },
          { label: "Vé thuê", name: "rentTicket" },
          { label: "Ngày tạo", name: "createdAt" },
          { label: "Ngày sửa", name: "updatedAt" },
          { label: "" },
        ]}
        sorting={sorting}
      >
        <MemberTableRow members={members} popup={popup} setPopup={setPopup} />
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
};

export default MemberTable;
