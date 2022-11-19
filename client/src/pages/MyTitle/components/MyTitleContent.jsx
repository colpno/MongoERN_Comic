import PropTypes from "prop-types";
import { memo } from "react";

import { GridTable } from "components";
import { Pagination } from "features";
import MyTitleTable from "./MyTitleTable";

function MyTitleContent({ titles, pagination, setPagination, sorting }) {
  return (
    <>
      <GridTable
        head={[
          {
            label: "#",
            name: "id",
            xs: 1,
          },
          {
            label: "Ảnh bìa",
          },
          {
            label: "Tiêu đề",
            name: "name",
            xs: 3,
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
        <MyTitleTable data={titles} />
      </GridTable>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </>
  );
}

MyTitleContent.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
  sorting: PropTypes.func,
};

MyTitleContent.defaultProps = {
  sorting: () => {},
};

export default memo(MyTitleContent);
