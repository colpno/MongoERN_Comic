import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { CircleC, CircleP } from "assets/images";
import styles from "../styles/CurrencyCount.module.scss";

const cx = classNames.bind(styles);

function CurrencyCount() {
  const user = useSelector((state) => state.user.user);

  return (
    <Container className={cx("wrapper")}>
      <Row>
        <Col>
          <p className={cx("wrapper__account")}>
            Tài khoản: <span className={cx("wrapper__account__name")}>{user.username}</span>
          </p>
          <h4 className={cx("wrapper__title")}>Số dư hiện tại</h4>
        </Col>
        <Col>
          <p className={cx("wrapper__label")}>Tổng số Coin</p>
          <div className={cx("wrapper__content")}>
            <CircleC className={cx("wrapper__icon")} />
            <span className={cx("wrapper__separate")}>x</span>
            <span className={cx("wrapper__balance")}>{user.coin}</span>
          </div>
        </Col>
        <Col>
          <p className={cx("wrapper__label")}>Tổng số Point</p>
          <div className={cx("wrapper__content")}>
            <CircleP className={cx("wrapper__icon")} />
            <span className={cx("wrapper__separate")}>x</span>
            <span className={cx("wrapper__balance")}>{user.point}</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CurrencyCount;
