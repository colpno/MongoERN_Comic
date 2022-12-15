import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { CircleC } from "assets/images";
import { NoData, Pagination } from "features";
import { usePagination } from "hooks";
import { getAllCoinHistories } from "services/coinHistory";
import { convertToDateTimeString } from "utils/convertTime";
import styles from "./assets/styles/CoinHistory.module.scss";

const cx = classNames.bind(styles);

function CoinHistory() {
  const HISTORIES_PER_PAGE = 30;
  const user = useSelector((state) => state.user.user);
  const [histories, setHistories] = useState([]);
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(HISTORIES_PER_PAGE);

  const fetchData = () => {
    const params = {
      userId: user.guid,
      sort: "createdAt",
      order: "desc",
      page: pagination.page,
      limit: pagination.limit,
    };
    getAllCoinHistories(params)
      .then((response) => {
        setHistories(response.data);
        setPaginationTotal(response.pagination.total);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {histories.length > 0 ? (
        <Container className={cx("coin-history")}>
          {histories.map((coinHistory) => {
            const { id, amount, createdAt } = coinHistory;
            // TODO: const { label } = payMethod;

            return (
              <Row className={cx("coin-history__row")} key={id}>
                <Col sm={1}>
                  <CircleC className={cx("coin-icon")} />
                </Col>
                <Col className={cx("coin-history__row__content")}>
                  {/* TODO: <h5>Nhận Coin từ {label}</h5> */}
                  <small>{convertToDateTimeString(createdAt)}</small>
                </Col>
                <Col className={cx("coin-history__row__quantity")}>
                  <strong>{amount >= 0 ? `+${amount}` : `-${amount}`}</strong>
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
          <h5>Hiện tại không có lịch sử Coint</h5>
        </NoData>
      )}
      {}
    </>
  );
}

export default CoinHistory;
