import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NoData, Pagination } from "features";
import { usePagination } from "hooks";
import { ticketHistoryService } from "services";
import styles from "./styles/TicketHistory.module.scss";
import TicketHistoryList from "./components/TicketHistoryList";

const cx = classNames.bind(styles);

function TicketHistory() {
  const HISTORIES_PER_PAGE = 30;
  const { guid: userId } = useSelector((state) => state.user.user);
  const [histories, setHistories] = useState([]);
  const { pagination, setPagination, setPaginationTotal } =
    usePagination(HISTORIES_PER_PAGE);
  const hasData = histories.length > 0;

  const fetchData = () => {
    const params = {
      userId,
      createdAt: false,
      _page: pagination.page,
      _limit: pagination.limit,
    };
    ticketHistoryService.getAll(params).then((response) => {
      setHistories(response.data);
      setPaginationTotal(response.paginate.total);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {hasData ? (
        <Container className={cx("ticket-history")}>
          <TicketHistoryList histories={histories} />
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
