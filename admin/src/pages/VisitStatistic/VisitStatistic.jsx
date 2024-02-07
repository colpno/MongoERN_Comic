import { Col, Container, Row } from "react-bootstrap";
import DetailReportStat from "./components/DetailReportStat";
import LikeViewStat from "./components/LikeViewStat.jsx";

function VisitStatistic() {
  return (
    <Container>
      <Row>
        <Col>
          <LikeViewStat />
        </Col>
      </Row>
      <Row>
        <Col>
          <DetailReportStat />
        </Col>
      </Row>
    </Container>
  );
}

export default VisitStatistic;
