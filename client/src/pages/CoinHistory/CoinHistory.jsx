import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import coinHistoryApi from "api/coinHistoryApi";
import { CircleC } from "assets/images";
import { NoData } from "features";
import { formatToDateTimeString } from "utils/convertTime";
import styles from "./assets/styles/CoinHistory.module.scss";

const cx = classNames.bind(styles);

function CoinHistory() {
  const userId = 1;
  const [coinHistories, setCoinHistories] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 30,
    page: 1,
    total: 0,
  });
  const hasData = coinHistories.length > 0;

  useEffect(() => {
    const fetchCoinHistory = async () => {
      const response = await coinHistoryApi.sort(userId, "createdAt", "desc", {
        _limit: pagination.limit,
        _page: pagination.page,
      });
      setCoinHistories(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    };

    fetchCoinHistory();
  }, [pagination.page]);

  return (
    <>
      {hasData ? (
        <Container className={cx("coin-history")}>
          {coinHistories.map((coinHistory) => {
            const { id, source, detail, amount, createdAt } = coinHistory;

            return (
              <Row className={cx("coin-history__row")} key={id}>
                <Col sm={1}>
                  <CircleC className={cx("coin-icon")} />
                </Col>
                <Col className={cx("coin-history__row__content")}>
                  <h5>Nhận Coin từ {source}</h5>
                  <small>{formatToDateTimeString(createdAt)}</small>
                  <p>[{detail}]</p>
                </Col>
                <Col className={cx("coin-history__row__quantity")}>
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

CoinHistory.propTypes = {};

export default CoinHistory;
