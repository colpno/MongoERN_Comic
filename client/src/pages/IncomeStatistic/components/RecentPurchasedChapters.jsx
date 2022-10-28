import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import { GridTable } from "components";
import { convertToDateString, formatTime } from "utils/convertTime";

function RecentPurchasedChapters({ cx, purchasedChapters }) {
  return (
    <GridTable border={false}>
      {purchasedChapters.map((transaction) => {
        const { id, user, chapter, createdAt } = transaction;
        const { userName } = user;
        const { titleName } = chapter;
        const { day, month, year, hour, minute } = formatTime(createdAt);

        return (
          <Row key={id}>
            <Col>
              <span>{userName}</span>
            </Col>
            <Col className={cx("transact-datetime")}>
              <p>{convertToDateString(day, month, year)}</p>
              <p>
                {hour}:{minute}
              </p>
            </Col>
            <Col className={cx("amount")}>
              <span>{titleName} </span>
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
        titleName: PropTypes.string.isRequired,
      }).isRequired,
      user: PropTypes.shape({
        userName: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default RecentPurchasedChapters;
