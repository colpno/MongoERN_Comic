import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import RankingFigure from "./RankingFigure";

function RankingList({ col, titles }) {
  return (
    <Row>
      {titles.map((title) => {
        return (
          <Col {...col} key={title.id}>
            <RankingFigure data={title} />
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
};
RankingList.defaultProps = {
  col: {
    sm: 12,
    md: 4,
    lg: 4,
    xl: 4,
    xxl: 4,
  },
};

export default RankingList;
