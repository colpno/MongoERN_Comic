import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

function PurchasedChaptersTableRow({ cx, history }) {
  const { transaction, title, chapter } = history;
  return (
    <Row className={cx("transaction__container")} key={transaction._id}>
      <Col md={8} className={cx("transaction__container__content")}>
        <div className={cx("box-img")}>
          <img src={title.cover.source} alt={title.title} />
        </div>
        <div>
          <p className={cx("title")}>{title.title}</p>
          <p className={cx("chapter")}>{chapter.title}</p>
        </div>
      </Col>
    </Row>
  );
}

PurchasedChaptersTableRow.propTypes = {
  history: PropTypes.shape({
    transaction: PropTypes.shape({
      _id: PropTypes.string.isRequired,
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
  }).isRequired,
  cx: PropTypes.func.isRequired,
};

export default PurchasedChaptersTableRow;
