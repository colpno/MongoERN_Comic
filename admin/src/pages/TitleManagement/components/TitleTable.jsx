import PropTypes from "prop-types";
import { memo } from "react";

import { GridTable } from "components";
import { Pagination } from "features";
import TitleTableRow from "./TitleTableRow";

function TitleTable({
  titles,
  pagination,
  setPagination,
  sorting,
  setPopup,
  setDeletedItem,
  setUpdate,
  setShowForm,
}) {
  return (
    <>
      <GridTable
        head={[
          {
            label: "#",
            name: "id",
            sm: 1,
          },
          {
            label: "Ảnh bìa",
          },
          {
            label: "Tiêu đề",
            name: "name",
            sm: 2,
          },
          {
            label: "Số chương",
            name: "totalChapter",
          },
          {
            label: "Trạng thái",
            name: "approveStatusId",
          },
          {
            label: "Ngày đăng",
            name: "createdAt",
          },
          {
            label: "Ngày sửa",
            name: "updatedAt",
          },
          {
            label: "",
          },
        ]}
        sorting={sorting}
      >
        <TitleTableRow
          data={titles}
          setPopup={setPopup}
          setDeletedItem={setDeletedItem}
          setUpdate={setUpdate}
          setShowForm={setShowForm}
        />
      </GridTable>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </>
  );
}

TitleTable.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.func,
  setPopup: PropTypes.func.isRequired,
  setDeletedItem: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

TitleTable.defaultProps = {
  sorting: () => {},
};

export default memo(TitleTable);
