/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import Button from "components/Button";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./assets/styles/_index.module.scss";
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
              key={notice.id}
              md={4}
              className={cx("notice-container__notice")}
            >
              <Button wrapper to={`/notice/${notice.id}`}>
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
