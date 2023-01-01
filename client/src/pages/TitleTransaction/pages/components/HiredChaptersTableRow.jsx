import moment from "moment";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

function HiredChaptersTableRow({ transactions, cx }) {
  return (
    <>
      {transactions.map((object) => {
        const { transaction, title, chapter } = object;

        return (
          <Row className={cx("transaction__container")} key={transaction._id}>
            <Col xs={8} className={cx("transaction__container__content")}>
              <div className={cx("box-img")}>
                <img src={title.cover.source} alt={title.title} />
              </div>
              <div>
                <p className={cx("title")}>{title.title}</p>
                <p className={cx("author")}>{chapter.title}</p>
              </div>
            </Col>
            <Col xs={4} className="center">
              <span>{`Thời gian thuê còn ${moment(transaction.expiredAt).toNow()}`}</span>
            </Col>
          </Row>
        );
      })}{" "}
    </>
  );
}

HiredChaptersTableRow.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transaction: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        expiredAt: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.shape({
        cover: PropTypes.shape({
          source: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
      chapter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  cx: PropTypes.func.isRequired,
};

export default HiredChaptersTableRow;
