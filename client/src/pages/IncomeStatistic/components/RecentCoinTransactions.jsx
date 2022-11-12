import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { GridTable } from "components";
import { convertToDateString, formatTime } from "utils/convertTime";
import { CircleC } from "assets/images";

function RecentCoinTransactions({ cx, transactions }) {
  return (
    <GridTable border={false}>
      {transactions.map((transaction) => {
        const { id, user, amount, createdAt } = transaction;
        const { username } = user;
        const { day, month, year, hour, minute } = formatTime(createdAt);

        return (
          <Row key={id}>
            <Col>
              <span>{username}</span>
            </Col>
            <Col className={cx("transact-datetime")}>
              <p>{convertToDateString(day, month, year)}</p>
              <p>
                {hour}:{minute}
              </p>
            </Col>
            <Col className={cx("amount")}>
              <span>{amount} </span>
              <CircleC />
            </Col>
          </Row>
        );
      })}
    </GridTable>
  );
}

RecentCoinTransactions.propTypes = {
  cx: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default RecentCoinTransactions;
