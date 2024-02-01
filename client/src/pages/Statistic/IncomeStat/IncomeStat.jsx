import classNames from "classnames/bind";
import { Col, Container, Row } from "react-bootstrap";

import styles from "../styles/Statistic.module.scss";
import TotalIncomeStat from "./components/TotalIncomeStat";

const cx = classNames.bind(styles);

function IncomeStat() {
  return (
    <Container className={cx("wrapper")}>
      <Row>
        <Col>
          <TotalIncomeStat />
        </Col>
      </Row>
    </Container>
  );
}

IncomeStat.propTypes = {};

export default IncomeStat;
