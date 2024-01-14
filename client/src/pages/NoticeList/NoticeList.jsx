import classNames from "classnames/bind";
import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useGetAllNotificationsQuery } from "api/notification.api.js";
import { Button } from "components";
import NoticeFigure from "./components/NoticeFigure";
import styles from "./styles/NoticeList.module.scss";

const cx = classNames.bind(styles);

function NoticeList() {
  const { data: notifications } = useGetAllNotificationsQuery({
    _sort: "updatedAt",
    _order: -1,
  });

  return (
    <Container className={cx("notice-container")}>
      <Row>
        {notifications?.length > 0 &&
          notifications.map((notice) => {
            return (
              <Col key={notice._id} md={4} className={cx("notice-container__notice")}>
                <Button wrapper to={`/notice/${notice._id}`}>
                  <NoticeFigure data={notice} />
                </Button>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default memo(NoticeList);
