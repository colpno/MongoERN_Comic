import classNames from "classnames/bind";
import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Button } from "components";
import { useGetNotifications } from "hooks/index.jsx";
import NoticeFigure from "./components/NoticeFigure";
import styles from "./styles/NoticeList.module.scss";

const cx = classNames.bind(styles);

function NoticeList() {
  const { data: notifications = [] } = useGetNotifications({
    _sort: {
      updatedAt: -1,
    },
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
