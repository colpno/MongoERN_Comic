import PropTypes from "prop-types";

import PointHistoryItem from "./PointHistoryItem";

function PointHistoryList({ histories }) {
  return (
    <>
      {histories.map((pointHistory) => {
        const { guid, payMethod, amount, createdAt } = pointHistory;
        const { label } = payMethod;

        return (
          <PointHistoryItem
            key={guid}
            label={label}
            createdAt={createdAt}
            amount={amount}
          />
        );
      })}
    </>
  );
}

PointHistoryList.propTypes = {
  histories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      paymentMethod: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default PointHistoryList;
