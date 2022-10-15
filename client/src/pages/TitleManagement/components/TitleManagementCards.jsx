import AdminCard from "layouts/AdminLayout/components/AdminCard";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

function TitleManagementCards({
  continuingCardData,
  pausedCardData,
  finishedCardData,
}) {
  return (
    <Row>
      <Col md={4}>
        <AdminCard
          rawData={continuingCardData.rawData}
          chartData={continuingCardData.chartData}
        />
      </Col>
      <Col md={4}>
        <AdminCard
          rawData={pausedCardData.rawData}
          chartData={pausedCardData.chartData}
        />
      </Col>
      <Col md={4}>
        <AdminCard
          rawData={finishedCardData.rawData}
          chartData={finishedCardData.chartData}
        />
      </Col>
    </Row>
  );
}

TitleManagementCards.propTypes = {
  continuingCardData: PropTypes.shape({
    rawData: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    chartData: PropTypes.shape({
      data: PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string.isRequired),
        datasets: PropTypes.arrayOf(
          PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
            backgroundColor: PropTypes.arrayOf(PropTypes.string.isRequired)
              .isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  pausedCardData: PropTypes.shape({
    rawData: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    chartData: PropTypes.shape({
      data: PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string.isRequired),
        datasets: PropTypes.arrayOf(
          PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
            backgroundColor: PropTypes.arrayOf(PropTypes.string.isRequired)
              .isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  finishedCardData: PropTypes.shape({
    rawData: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    chartData: PropTypes.shape({
      data: PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string.isRequired),
        datasets: PropTypes.arrayOf(
          PropTypes.shape({
            data: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
            backgroundColor: PropTypes.arrayOf(PropTypes.string.isRequired)
              .isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export default TitleManagementCards;
