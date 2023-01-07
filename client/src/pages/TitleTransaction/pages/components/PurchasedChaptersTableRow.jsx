import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

function PurchasedChaptersTableRow({ cx, history }) {
  return (
    <Row className={cx("transaction__container")}>
      <Col md={8} className={cx("transaction__container__content")}>
        <div className={cx("box-img")}>
          <img src={history.title_id.cover.source} alt={history.title_id.title} />
        </div>
        <div>
          <p className={cx("title")}>{history.title_id.title}</p>
          <p className={cx("chapter")}>{history.chapter_id.title}</p>
        </div>
      </Col>
    </Row>
  );
}

PurchasedChaptersTableRow.propTypes = {
  history: PropTypes.shape({
    title_id: PropTypes.shape({
      cover: PropTypes.shape({
        source: PropTypes.string.isRequired,
      }).isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
    chapter_id: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  cx: PropTypes.func.isRequired,
};

export default PurchasedChaptersTableRow;
