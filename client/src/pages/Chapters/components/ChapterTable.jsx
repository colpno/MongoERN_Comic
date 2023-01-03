import PropTypes from "prop-types";

import { GridTable } from "components";
import { Pagination } from "features";
import ChaptersTableRow from "./ChapterTableRow";

function ChapterTable({ chapters, setPopup, setDeleteItem, pagination, setPagination, sorting }) {
  return (
    <>
      <GridTable
        head={[
          { label: "#", name: "order", xs: 1 },
          { label: "Ảnh bìa" },
          { label: "Tên chương", name: "title", xs: 3 },
          { label: "Ngày tạo", name: "createdAt" },
          { label: "Ngày sửa", name: "updatedAt" },
          { label: "Trạng thái", name: "approved_status_id" },
          { label: "" },
        ]}
        sorting={sorting}
      >
        {chapters.length > 0 && (
          <ChaptersTableRow chapters={chapters} setPopup={setPopup} setDeleteItem={setDeleteItem} />
        )}
      </GridTable>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </>
  );
}

ChapterTable.propTypes = {
  chapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  setDeleteItem: PropTypes.func.isRequired,
  setPopup: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.func.isRequired,
};

export default ChapterTable;
