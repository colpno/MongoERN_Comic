import PropTypes from "prop-types";
import { memo } from "react";

import { GridTable } from "components";
import Pagination from "features/Pagination";
import MyTitleTable from "./MyTitleTable";

function MyTitleContent({ titles, pagination, setPagination, sorting }) {
  const onPageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  return (
    <>
      <GridTable
        head={[
          {
            label: "#",
            name: "index",
            sm: 1,
          },
          {
            label: "Ảnh bìa",
          },
          {
            label: "Tiêu đề",
            name: "titleName",
            md: 3,
          },
          {
            label: "Số chương",
            name: "totalChapter",
          },
          {
            label: "Trạng thái",
            name: "titleStatusId",
          },
          {
            label: "Ngày đăng",
            name: "createdAt",
          },
          {
            label: "Ngày cập nhật",
            name: "updatedAt",
          },
          {
            label: "",
          },
        ]}
        sorting={sorting}
        border
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
      titleName: PropTypes.oneOfType([
        PropTypes.string.isRequired,
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.node.isRequired,
            PropTypes.string.isRequired,
          ]).isRequired
        ).isRequired,
      ]).isRequired,
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
  sorting: PropTypes.func,
};

MyTitleContent.defaultProps = {
  sorting: () => {},
};

export default memo(MyTitleContent);
