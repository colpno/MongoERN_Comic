import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { CircleC } from "assets/images";
import { NoData, Pagination } from "features";
import { sortCoinHistories } from "services/coinHistory";
import { convertToDateTimeString } from "utils/convertTime";
import styles from "./assets/styles/CoinHistory.module.scss";

const cx = classNames.bind(styles);

function CoinHistory() {
  const userId = 1;
  const { coinHistories, pagination, setPagination } = sortCoinHistories(
    userId,
    "createdAt",
    false,
    30
  );
  const hasData = coinHistories.length > 0;

  return (
    <>
      {hasData ? (
        <Container className={cx("coin-history")}>
          {coinHistories.map((coinHistory) => {
            const { id, payMethod, amount, createdAt } = coinHistory;
            const { label } = payMethod;

            return (
              <Row className={cx("coin-history__row")} key={id}>
                <Col sm={1}>
                  <CircleC className={cx("coin-icon")} />
                </Col>
                <Col className={cx("coin-history__row__content")}>
                  <h5>Nhận Coin từ {label}</h5>
                  <small>{convertToDateTimeString(createdAt)}</small>
                </Col>
                <Col className={cx("coin-history__row__quantity")}>
                  <strong>{amount > 0 ? `+${amount}` : `-${amount}`}</strong>
                </Col>
              </Row>
            );
          })}
          <Row>
            <Pagination pagination={pagination} setPagination={setPagination} />
          </Row>
        </Container>
      ) : (
        <NoData>
          <p>Hiện tại không có lích sử Coint</p>
        </NoData>
      )}
      <div className={cx("")} />
    </>
  );
}

export default CoinHistory;
