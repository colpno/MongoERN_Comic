import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import { CircleP } from "assets/images";
import { convertToDateTimeString } from "utils/convertTime";
import styles from "../assets/styles/PointHistoryItem.module.scss";

const cx = classNames.bind(styles);

function PointHistoryItem({ label, createdAt, amount }) {
  return (
    <Row className={cx("item-wrapper")}>
      <Col sm={1}>
        <CircleP className={cx("icon")} />
      </Col>
      <Col className={cx("source")}>
        <h5>Nhận Point từ {label}</h5>
        <small>{convertToDateTimeString(createdAt)}</small>
      </Col>
      <Col className={cx("quantity")}>
        <strong>{amount > 0 ? `+${amount}` : `-${amount}`}</strong>
      </Col>
    </Row>
  );
}

PointHistoryItem.propTypes = {
  label: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default PointHistoryItem;
