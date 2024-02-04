/* eslint-disable no-unused-vars */
import { Col, Container, Row } from "react-bootstrap";
import IncomeStat from "./components/IncomeStat";
import PersonalIncomeStat from "./components/PersonalIncomeStat";
import PurchaseStat from "./components/PurchaseStat";
import TransactionStat from "./components/TransactionStat";

function TradingStatistic() {
  return (
    <Container>
      <Row>
        <Col md={7}>
          <Row>
            <Col md={12}>
              <IncomeStat />
            </Col>
            <Col md={12}>
              <PersonalIncomeStat />
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <TransactionStat />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <PurchaseStat />
        </Col>
      </Row>
    </Container>
  );
}

export default TradingStatistic;
