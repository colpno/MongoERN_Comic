/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import { Button } from "components";
import styles from "./styles/NoticeList.module.scss";
import NoticeFigure from "./components/NoticeFigure";

const cx = classNames.bind(styles);

function NoticeList() {
  // const notices = NoticeArray();

  return (
    <Container className={cx("notice-container")}>
      <Row>
        {/* {notices.map((notice) => {
          return (
            <Col
              key={notice._id}
              md={4}
              className={cx("notice-container__notice")}
            >
              <Button wrapper to={`/notice/${notice._id}`}>
                <NoticeFigure data={notice} />
              </Button>
            </Col>
          );
        })} */}
      </Row>
    </Container>
  );
}

export default NoticeList;
