import classNames from "classnames/bind";
import moment from "moment";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { CircleC } from "assets/images";
import { COIN_HISTORIES_PER_PAGE } from "constants/paginate.constant";
import { NoData, Pagination } from "features";
import { usePagination } from "hooks";
import { coinHistoryService } from "services";
import styles from "./CoinHistory.module.scss";

const cx = classNames.bind(styles);

function CoinHistory() {
  const user = useSelector((state) => state.user.user);
  const [histories, setHistories] = useState([]);
  const { pagination, setPagination, setPaginationTotal } = usePagination(COIN_HISTORIES_PER_PAGE);

  useEffect(() => {
    const params = {
      user_id: user._id,
      _sort: "createdAt",
      _order: "desc",
      _page: pagination.page,
      _limit: pagination.limit,
    };

    coinHistoryService
      .getAll(params)
      .then((response) => {
        setHistories(response.data);
        setPaginationTotal(response.paginate.total);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {histories.length > 0 ? (
        <Container className={cx("coin-history")}>
          {histories.map((history) => {
            return (
              <Row className={cx("coin-history__row")} key={history._id}>
                <Col sm={1}>
                  <CircleC className={cx("coin-icon")} />
                </Col>
                <Col className={cx("coin-history__row__content")}>
                  <h5>
                    {history.amount >= 0 ? "Nhận" : "Trừ"} coin từ {history.payment_method}
                  </h5>
                  <small>{moment(history.createdAt).format("DD/MM/YYYY hh:mm:ss")}</small>
                </Col>
                <Col
                  className={cx(
                    "coin-history__row__quantity",
                    history.amount >= 0 ? "green" : "red"
                  )}
                >
                  <strong>{history.amount >= 0 ? `+${history.amount}` : history.amount}</strong>
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
          <h5>Bạn không có lịch sử coin nào</h5>
        </NoData>
      )}
      {}
    </>
  );
}

export default CoinHistory;
