import classNames from "classnames/bind";
import { FloatingContainer } from "components/index.jsx";
import { useLazyGetChapters } from "hooks/index.jsx";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChapterPayStat from "./components/ChapterPayStat.jsx";
import ChapterSelector from "./components/ChapterSelector";
import ChapterTable from "./components/ChapterTable";
import StatChapterStatus from "./components/StatChapterStatus.jsx";
import styles from "./styles/Chapters.module.scss";

const cx = classNames.bind(styles);

function Chapters() {
  const [selectedTitle, setSelectedTitle] = useState({ value: "all", label: "Tất cả" });
  const { get: getChapters, data: chapters } = useLazyGetChapters();

  useEffect(() => {
    const { value: titleId } = selectedTitle;
    getChapters({
      title_id: titleId !== "all" ? titleId : undefined,
      _embed: JSON.stringify([{ collection: "status_id", field: "-_id status color" }]),
    });
  }, [selectedTitle]);

  return (
    <Container>
      <Row>
        <Col className={cx("label-wrapper")}>
          <ChapterSelector selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <ChapterTable chapters={chapters} selectedTitle={selectedTitle} />
        </Col>
        <Col lg={4}>
          <Row>
            <Col>
              <FloatingContainer>
                <ChapterPayStat chapters={chapters} />
              </FloatingContainer>
            </Col>
            <Col>
              <FloatingContainer>
                <StatChapterStatus chapters={chapters} />
              </FloatingContainer>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Chapters;
