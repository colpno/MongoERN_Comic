import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";
import { Col, Row } from "react-bootstrap";

import { CardFigure } from "components";
import Styles from "./CardList.module.scss";

const cx = classNames.bind(Styles);

function CardList({
  col,
  data,
  showTotalChapter,
  showSummary,
  showAuthor,
  showLike,
  showView,

  dropRow,
}) {
  const classes = `${cx(
    "cards-wrapper__cards",
    dropRow ? "drop-row" : null
  )} row`;

  return (
    <Row className={classes}>
      {data.map((card, index) => {
        return (
          <Col {...col} key={index}>
            <CardFigure
              to={`/comic/title/${card._id}`}
              data={card}
              showTotalChapter={showTotalChapter}
              showSummary={showSummary}
              showAuthor={showAuthor}
              showLike={showLike}
              showView={showView}
            />
          </Col>
        );
      })}
    </Row>
  );
}

CardList.propTypes = {
  col: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showTotalChapter: PropTypes.bool,
  showSummary: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showLike: PropTypes.bool,
  showView: PropTypes.bool,
  wrap: PropTypes.bool,
  dropRow: PropTypes.bool,
};

CardList.defaultProps = {
  col: {},
  showTotalChapter: false,
  showSummary: false,
  showAuthor: true,
  showLike: true,
  showView: true,
  wrap: false,
  dropRow: true,
};

export default memo(CardList);
