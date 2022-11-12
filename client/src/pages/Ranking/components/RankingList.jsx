import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import RankingFigure from "./RankingFigure";
import "../assets/styles/RankingList.scss";

function RankingList({ col, titles, startRank }) {
  return (
    <Row>
      {titles.map((title, index) => {
        return (
          <Col {...col} key={title.id} className="ranking-card__wrapper">
            <RankingFigure rank={startRank + index} data={title} />
          </Col>
        );
      })}
    </Row>
  );
}

RankingList.propTypes = {
  col: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
  }),
  titles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired
  ).isRequired,
  startRank: PropTypes.number.isRequired,
};
RankingList.defaultProps = {
  col: {},
};

export default RankingList;
