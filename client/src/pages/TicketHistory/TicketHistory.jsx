import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import ticketHistoryApi from "api/ticketHistoryApi";
import { RentTicket } from "assets/images";
import NoData from "features/NoData";
import { formatToDateTimeString } from "utils/convertTime";
import styles from "./assets/styles/TicketHistory.module.scss";

const cx = classNames.bind(styles);

function TicketHistory() {
  const userId = 1;
  const [ticketHistories, setTicketHistories] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 30,
    page: 1,
    total: 0,
  });
  const hasData = ticketHistories.length > 0;

  useEffect(() => {
    const fetchTicketHistory = async () => {
      const response = await ticketHistoryApi.sort(
        userId,
        "createdAt",
        "desc",
        {
          _limit: pagination.limit,
          _page: pagination.page,
        }
      );
      setTicketHistories(response.data);
      setPagination({ ...pagination, total: response.pagination.total });
    };

    fetchTicketHistory();
  }, [pagination.page]);

  return (
    <>
      {hasData ? (
        <Container className={cx("ticket-history")}>
          {ticketHistories.map((coinHistory) => {
            const { id, source, detail, amount, createdAt } = coinHistory;

            return (
              <Row className={cx("ticket-history__row")} key={id}>
                <Col sm={1}>
                  <RentTicket />
                </Col>
                <Col className={cx("ticket-history__row__content")}>
                  <h5>Nhận Vé thuê từ {source}</h5>
                  <small>{formatToDateTimeString(createdAt)}</small>
                  <p>[{detail}]</p>
                </Col>
                <Col className={cx("ticket-history__row__quantity")}>
                  <strong>{amount > 0 ? `+${amount}` : `-${amount}`}</strong>
                </Col>
              </Row>
            );
          })}
        </Container>
      ) : (
        <NoData>
          <p>Hiện tại không có lích sử Point</p>
        </NoData>
      )}
      <div className={cx("")} />
    </>
  );
}

TicketHistory.propTypes = {};

export default TicketHistory;
