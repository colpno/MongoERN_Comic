import PropTypes from "prop-types";

import TicketHistoryItem from "./TicketHistoryItem";

function TicketHistoryList({ histories }) {
  return (
    <>
      {histories.map((coinHistory) => {
        const { id, source, detail, amount, createdAt } = coinHistory;

        return (
          <TicketHistoryItem
            key={id}
            source={source}
            amount={amount}
            detail={detail}
            createdAt={createdAt}
          />
        );
      })}
    </>
  );
}

TicketHistoryList.propTypes = {
  histories: PropTypes.arrayOf(
    PropTypes.shape({
      source: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      detail: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default TicketHistoryList;
