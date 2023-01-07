import moment from "moment";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

function HiredChaptersTableRow({ transactions, cx }) {
  return (
    <>
      {transactions.map((history) => {
        return (
          <Row className={cx("transaction__container")} key={history._id}>
            <Col xs={8} className={cx("transaction__container__content")}>
              <div className={cx("box-img")}>
                <img src={history.title_id.cover.source} alt={history.title_id.title} />
              </div>
              <div>
                <p className={cx("title")}>{history.title_id.title}</p>
                <p className={cx("author")}>{history.chapter_id.title}</p>
              </div>
            </Col>
            <Col xs={4} className="center">
              <span>{`Thời gian thuê còn ${moment(history.expiredAt).toNow()}`}</span>
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
      _id: PropTypes.string.isRequired,
      expiredAt: PropTypes.string.isRequired,
      title_id: PropTypes.shape({
        cover: PropTypes.shape({
          source: PropTypes.string.isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
      chapter_id: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  cx: PropTypes.func.isRequired,
};

export default HiredChaptersTableRow;
