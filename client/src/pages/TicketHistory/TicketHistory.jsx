import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { RentTicket } from "assets/images";
import { NoData, Pagination } from "features";
import { sortTicketHistories } from "services/ticketHistory";
import { convertToDateTimeString } from "utils/convertTime";
import styles from "./assets/styles/TicketHistory.module.scss";

const cx = classNames.bind(styles);

function TicketHistory() {
  const userId = 1;
  const { ticketHistories, pagination, setPagination } = sortTicketHistories(
    userId,
    "createdAt",
    false,
    30
  );
  const hasData = ticketHistories.length > 0;

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
                  <small>{convertToDateTimeString(createdAt)}</small>
                  <p>[{detail}]</p>
                </Col>
                <Col className={cx("ticket-history__row__quantity")}>
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
          <p>Hiện tại không có lích sử Point</p>
        </NoData>
      )}
      <div className={cx("")} />
    </>
  );
}

export default TicketHistory;
