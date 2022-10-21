import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import pointHistoryApi from "api/pointHistoryApi";
import { CircleP } from "assets/images";
import { NoData } from "features";
import { formatToDateTimeString } from "utils/convertTime";
import styles from "./assets/styles/PointHistory.module.scss";

const cx = classNames.bind(styles);

function PointHistory() {
  const userId = 1;
  const [pointHistories, setPointHistories] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 30,
    page: 1,
    total: 0,
  });
  const hasData = pointHistories.length > 0;

  useEffect(() => {
    const fetchPointHistory = async () => {
      const response = await pointHistoryApi.sort(userId, "createdAt", "desc", {
        _limit: pagination.limit,
        _page: pagination.page,
      });
      setPointHistories(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    };

    fetchPointHistory();
  }, [pagination.page]);

  return (
    <>
      {hasData ? (
        <Container className={cx("point-history")}>
          {pointHistories.map((pointHistory) => {
            const { id, source, detail, amount, createdAt } = pointHistory;

            return (
              <Row className={cx("point-history__row")} key={id}>
                <Col sm={1}>
                  <CircleP className={cx("point-icon")} />
                </Col>
                <Col className={cx("point-history__row__content")}>
                  <h5>Nhận Point từ {source}</h5>
                  <small>{formatToDateTimeString(createdAt)}</small>
                  <p>[{detail}]</p>
                </Col>
                <Col className={cx("point-history__row__quantity")}>
                  <strong>{amount > 0 ? `+${amount}` : `-${amount}`}</strong>
                </Col>
              </Row>
            );
          })}
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

PointHistory.propTypes = {};

export default PointHistory;
