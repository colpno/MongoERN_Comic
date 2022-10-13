import { CircleC, CircleP } from "assets/images";
import classNames from "classnames/bind";
import { UserArray } from "database";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../assets/styles/CurrencyCount.module.scss";

const cx = classNames.bind(styles);

function CurrencyCount() {
  const user = UserArray()[0];

  return (
    <Container className={cx("wrapper")}>
      <Row>
        <Col>
          <p className={cx("wrapper__account")}>
            Tài khoản:{" "}
            <span className={cx("wrapper__account__name")}>
              {user.userName}
            </span>
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
