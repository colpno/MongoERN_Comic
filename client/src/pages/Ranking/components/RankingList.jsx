import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import { Slide } from "react-awesome-reveal";
import "../styles/RankingList.scss";
import RankingFigure from "./RankingFigure";

function RankingList({ col, titles, startRank }) {
  return (
    <Row>
      {titles.map((title, index) => {
        return (
          <Col {...col} key={title._id} className="ranking-card__wrapper">
            <Slide direction="up" triggerOnce>
              <RankingFigure rank={startRank + index} data={title} />
            </Slide>
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
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired
  ).isRequired,
  startRank: PropTypes.number.isRequired,
};
RankingList.defaultProps = {
  col: {},
};

export default RankingList;
