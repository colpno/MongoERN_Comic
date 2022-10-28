import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import { FloatingContainer } from "components";
import { LineChart } from "features";

function IncomeChart({ labels, datasets }) {
  return (
    <Row>
      <Col>
        <FloatingContainer>
          <LineChart labels={labels} datasets={datasets} />
        </FloatingContainer>
      </Col>
    </Row>
  );
}

IncomeChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  datasets: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default IncomeChart;
