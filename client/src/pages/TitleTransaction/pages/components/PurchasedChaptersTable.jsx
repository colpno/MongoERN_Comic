import { GridTable } from "components";
import PropTypes from "prop-types";
import { Pagination } from "features";
import PurchasedChaptersTableRow from "./PurchasedChaptersTableRow";

function PurchasedChaptersTable({ transactions, cx, pagination, setPagination }) {
  return (
    <GridTable
      head={[
        {
          label: `Hiển thị có tổng cộng ${transactions.length} nội dung`,
        },
      ]}
    >
      <>
        {transactions.map((history) => {
          return (
            <PurchasedChaptersTableRow cx={cx} history={history} key={history.transaction._id} />
          );
        })}
      </>
      <Pagination pagination={pagination} setPagination={setPagination} />
    </GridTable>
  );
}

PurchasedChaptersTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  cx: PropTypes.func.isRequired,
  pagination: PropTypes.shape({}).isRequired,
  setPagination: PropTypes.func.isRequired,
};

export default PurchasedChaptersTable;
