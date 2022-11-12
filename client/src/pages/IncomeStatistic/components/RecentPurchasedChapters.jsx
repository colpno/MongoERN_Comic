import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import { GridTable } from "components";
import { convertToDateString, formatTime } from "utils/convertTime";

function RecentPurchasedChapters({ cx, purchasedChapters }) {
  return (
    <GridTable border={false}>
      {purchasedChapters.map((transaction) => {
        const { id, user, chapter, createdAt } = transaction;
        const { username } = user;
        const { name } = chapter;
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
              <span>{name} </span>
            </Col>
          </Row>
        );
      })}
    </GridTable>
  );
}

RecentPurchasedChapters.propTypes = {
  cx: PropTypes.func.isRequired,
  purchasedChapters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      chapter: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default RecentPurchasedChapters;
