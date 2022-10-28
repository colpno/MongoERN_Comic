import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { CircleP } from "assets/images";
import { NoData, Pagination } from "features";
import { sortPointHistories } from "services/pointHistory";
import { convertToDateTimeString } from "utils/convertTime";
import styles from "./assets/styles/PointHistory.module.scss";

const cx = classNames.bind(styles);

function PointHistory() {
  const userId = 1;
  const { pointHistories, pagination, setPagination } = sortPointHistories(
    userId,
    "createdAt",
    false,
    30
  );
  const hasData = pointHistories.length > 0;

  return (
    <>
      {hasData ? (
        <Container className={cx("point-history")}>
          {pointHistories.map((pointHistory) => {
            const { id, payMethod, amount, createdAt } = pointHistory;
            const { label } = payMethod;

            return (
              <Row className={cx("point-history__row")} key={id}>
                <Col sm={1}>
                  <CircleP className={cx("point-icon")} />
                </Col>
                <Col className={cx("point-history__row__content")}>
                  <h5>Nhận Point từ {label}</h5>
                  <small>{convertToDateTimeString(createdAt)}</small>
                </Col>
                <Col className={cx("point-history__row__quantity")}>
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

export default PointHistory;
