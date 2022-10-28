import { GridTable } from "components";
import PropTypes from "prop-types";
import ReadingHistoryTableRow from "./ReadingHistoryTableRow";

function ReadingHistoryTable({ readingHistories, cx, calculateCountdown }) {
  return (
    <GridTable
      head={[
        {
          label: "Hiển thị 25 nội dung được đọc gần đây nhất",
          md: 8,
        },
        {
          label: "Ngày đọc",
          center: true,
        },
      ]}
    >
      <ReadingHistoryTableRow
        readingHistories={readingHistories}
        cx={cx}
        calculateCountdown={calculateCountdown}
      />
    </GridTable>
  );
}

ReadingHistoryTable.propTypes = {
  readingHistories: PropTypes.arrayOf(PropTypes.shape({}).isRequired)
    .isRequired,
  cx: PropTypes.func.isRequired,
  calculateCountdown: PropTypes.func.isRequired,
};

export default ReadingHistoryTable;
