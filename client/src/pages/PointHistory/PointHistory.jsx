/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { NoData, Pagination } from "features";
import { usePagination } from "hooks";
import styles from "./styles/PointHistory.module.scss";
import PointHistoryList from "./components/PointHistoryList";

const cx = classNames.bind(styles);

function PointHistory() {
  const HISTORIES_PER_PAGE = 30;
  const { guid: userId } = useSelector((state) => state.user.user);
  const [histories, setHistories] = useState([]);
  const { pagination, setPagination, setPaginationTotal } = usePagination(HISTORIES_PER_PAGE);
  const hasData = histories.length > 0;

  const fetchData = () => {
    const params = {
      userId,
      _sort: {
        createdAt: -1,
      },
      _page: pagination.page,
      _limit: pagination.limit,
    };
    // pointHistoryService.getAll(params).then((response) => {
    //   setHistories(response.data);
    //   setPaginationTotal(response.pagination.total);
    // });
  };

  useEffect(() => {
    fetchData();
  }, [pagination.page]);

  return (
    <>
      {hasData ? (
        <Container className={cx("point-history")}>
          <PointHistoryList histories={histories} />
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
