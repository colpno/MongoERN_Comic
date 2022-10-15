import PropTypes from "prop-types";
import { memo } from "react";

import { GridTable } from "components";
import Pagination from "features/Pagination";
import MyTitleTable from "./MyTitleTable";

function MyTitleContent({ titles, pagination, setPagination }) {
  const onPageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  return (
    <>
      <GridTable
        head={[
          {
            label: "Ảnh bìa",
          },
          {
            label: "Tiêu đề",
            md: 3,
          },
          {
            label: "Số chương",
          },
          {
            label: "Trạng thái",
          },
          {
            label: "Ngày đăng",
          },
          {
            label: "Ngày cập nhật",
          },
          {
            label: "",
          },
        ]}
      >
        <MyTitleTable data={titles} />
      </GridTable>
      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </>
  );
}

MyTitleContent.propTypes = {
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      titleName: PropTypes.string.isRequired,
      coverImage: PropTypes.string.isRequired,
      totalChapter: PropTypes.number.isRequired,
      titleStatusId: PropTypes.number.isRequired,
    })
  ).isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  setPagination: PropTypes.func.isRequired,
};

export default memo(MyTitleContent);
