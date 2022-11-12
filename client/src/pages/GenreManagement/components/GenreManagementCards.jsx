import { Col } from "react-bootstrap";
import PropTypes from "prop-types";

import AdminCard from "layouts/AdminLayout/components/AdminCard";
import {
  getContinuingCardData,
  getFinishedCardData,
  getPausedCardData,
} from "../const";

function TitleManagementCards({ totalTitles }) {
  const continuingCardData = getContinuingCardData(totalTitles, 123);
  const pausedCardData = getPausedCardData(totalTitles, 23);
  const finishedCardData = getFinishedCardData(totalTitles, 50);

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
  totalTitles: PropTypes.number.isRequired,
};

export default TitleManagementCards;
