import AdminCard from "layouts/AdminLayout/components/AdminCard";
import PropTypes from "prop-types";
import { Col } from "react-bootstrap";

function TitleManagementCards({
  continuingCardData,
  pausedCardData,
  finishedCardData,
}) {
  return (
    <>
      <Col md={4}>
        <AdminCard
          rawData={continuingCardData.rawData}
          chartProps={continuingCardData.chartProps}
        />
      </Col>
      <Col md={4}>
        <AdminCard
          rawData={pausedCardData.rawData}
          chartProps={pausedCardData.chartProps}
        />
      </Col>
      <Col md={4}>
        <AdminCard
          rawData={finishedCardData.rawData}
          chartProps={finishedCardData.chartProps}
        />
      </Col>
    </>
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
    chartProps: PropTypes.shape({}).isRequired,
  }).isRequired,
  pausedCardData: PropTypes.shape({
    rawData: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    chartProps: PropTypes.shape({}).isRequired,
  }).isRequired,
  finishedCardData: PropTypes.shape({
    rawData: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      subLabel: PropTypes.string,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    chartProps: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default TitleManagementCards;
