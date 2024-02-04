import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ChapterReportStat from "./components/ChapterReportStat";
import TitleReportStat from "./components/TitleReportStat";

function VisitStatistic() {
  const [selectedTitle, setSelectedTitle] = useState();

  return (
    <Container>
      <Row>
        <Col>
          <TitleReportStat selectedTitle={selectedTitle} setSelectedTitle={setSelectedTitle} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ChapterReportStat selectedTitle={selectedTitle} />
        </Col>
      </Row>
    </Container>
  );
}

export default VisitStatistic;
