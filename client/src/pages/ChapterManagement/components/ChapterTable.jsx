import React from "react";
import PropTypes from "prop-types";
import { GridTable } from "components";
import ChapterTableRow from "pages/Chapters/components/ChapterTableRow";
import { Pagination } from "features";

function ChapterTable({
  chapters,
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
          { label: "Thứ tự", name: "order", sm: 1 },
          { label: "Ảnh bìa" },
          { label: "Tên chương", name: "titleName" },
          { label: "Ngày tạo", name: "createdAt" },
          { label: "Ngày cập nhật", name: "updatedAt" },
          { label: "Đặt lịch", name: "schedule" },
          { label: "Trạng thái", name: "statusId" },
          { label: "" },
        ]}
        sorting={sorting}
      >
        <ChapterTableRow
          chapters={chapters}
          popup={popup}
          setPopup={setPopup}
        />
      </GridTable>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </>
  );
}

ChapterTable.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  popup: PropTypes.shape({}).isRequired,
  setPopup: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.func.isRequired,
};

export default ChapterTable;
