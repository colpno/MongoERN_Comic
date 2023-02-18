import React from "react";
import PropTypes from "prop-types";
import { GridTable } from "components";
import { Pagination } from "features";
import GenreTableRow from "./GenreTableRow";

function GenreTable({
  genres,
  pagination,
  sorting,
  setPagination,
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
          { label: "Thể loại", name: "name", sm: 4 },
          { label: "Ngày tạo", name: "createdAt" },
          { label: "Ngày sửa", name: "updatedAt" },
          { label: "", sm: 2 },
        ]}
        sorting={sorting}
      >
        <GenreTableRow
          genres={genres}
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

GenreTable.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.func.isRequired,
  setDeleteItem: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default GenreTable;
