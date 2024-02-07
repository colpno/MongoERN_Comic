import { Col, Container, Row } from "react-bootstrap";
import AppearanceStatuses from "./components/AppearanceStatuses.jsx";
import ApprovedStatuses from "./components/ApprovedStatuses.jsx";

function Statuses() {
  return (
    <Container>
      <Row>
        <Col>
          <ApprovedStatuses />
        </Col>
      </Row>
      <Row>
        <Col>
          <AppearanceStatuses />
        </Col>
      </Row>
    </Container>
  );
}

export default Statuses;
