import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { RentTicket } from "assets/images";
import { convertToDateTimeString } from "utils/convertTime";
import styles from "../styles/TicketHistoryItem.module.scss";

const cx = classNames.bind(styles);

function TicketHistoryItem({ source, createdAt, amount, detail }) {
  return (
    <Row className={cx("item-wrapper")}>
      <Col sm={1}>
        <RentTicket />
      </Col>
      <Col className={cx("source")}>
        <h5>Nhận Vé thuê từ {source}</h5>
        <small>{convertToDateTimeString(createdAt)}</small>
        <p>[{detail}]</p>
      </Col>
      <Col className={cx("quantity")}>
        <strong>{amount > 0 ? `+${amount}` : `-${amount}`}</strong>
      </Col>
    </Row>
  );
}

TicketHistoryItem.propTypes = {
  source: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  detail: PropTypes.string.isRequired,
};

export default TicketHistoryItem;
