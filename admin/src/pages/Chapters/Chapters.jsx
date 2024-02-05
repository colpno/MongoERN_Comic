import classNames from "classnames/bind";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChapterSelector from "./components/ChapterSelector";
import ChapterTable from "./components/ChapterTable";
import styles from "./styles/Chapters.module.scss";

const cx = classNames.bind(styles);

function Chapters() {
  const [selectedTitle, setSelectedTitle] = useState({ value: "all", label: "Tất cả" });

  return (
    <Container>
      <Row>
        <Col className={cx("label-wrapper")}>
          <ChapterSelector selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ChapterTable selectedTitle={selectedTitle} />
        </Col>
      </Row>
    </Container>
  );
}

export default Chapters;
