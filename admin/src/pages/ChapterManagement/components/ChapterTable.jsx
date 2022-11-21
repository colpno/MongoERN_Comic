import React from "react";
import PropTypes from "prop-types";
import { GridTable } from "components";
import ChapterTableRow from "pages/ChapterManagement/components/ChapterTableRow";
import { Pagination } from "features";

function ChapterTable({
  chapters,
  popup,
  setPopup,
  setDeleteItem,
  pagination,
  setPagination,
  sorting,
  setUpdate,
  setShowForm,
}) {
  return (
    <>
      <GridTable
        head={[
          { label: "#", name: "id", sm: 1 },
          { label: "Ảnh bìa" },
          { label: "Tên chương", name: "name", sm: 3 },
          { label: "Ngày tạo", name: "createdAt" },
          { label: "Ngày sửa", name: "updatedAt" },
          { label: "Trạng thái", name: "approvedStatusId" },
          { label: "" },
        ]}
        sorting={sorting}
      >
        {chapters.length > 0 && (
          <ChapterTableRow
            chapters={chapters}
            popup={popup}
            setPopup={setPopup}
            setDeleteItem={setDeleteItem}
            setUpdate={setUpdate}
            setShowForm={setShowForm}
          />
        )}
      </GridTable>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </>
  );
}

ChapterTable.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  popup: PropTypes.shape({}).isRequired,
  setDeleteItem: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default ChapterTable;
