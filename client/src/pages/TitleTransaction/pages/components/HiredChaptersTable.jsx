import { GridTable } from "components";
import { Pagination } from "features";
import PropTypes from "prop-types";
import HiredChaptersTableRow from "./HiredChaptersTableRow";

function HiredChaptersTable({
  titlesAndChapters,
  cx,
  pagination,
  setPagination,
}) {
  return (
    <GridTable
      head={[
        {
          label: `Hiển thị có tổng cộng ${titlesAndChapters.length} nội dung`,
        },
      ]}
    >
      <HiredChaptersTableRow titlesAndChapters={titlesAndChapters} cx={cx} />
      <Pagination pagination={pagination} setPagination={setPagination} />
    </GridTable>
  );
}

HiredChaptersTable.propTypes = {
  titlesAndChapters: PropTypes.arrayOf(PropTypes.shape({}).isRequired)
    .isRequired,
  cx: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
};

export default HiredChaptersTable;
