import classNames from "classnames/bind";
import { memo } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import Button from "components/Button";
import CardFigure from "components/CardFigure/CardFigure";
import Styles from "./CardList.module.scss";

const cx = classNames.bind(Styles);

function CardList({
  col,
  data,
  headTitle,
  showTotalChapter,
  showSummary,
  showAuthor,
  showLike,
  showView,
  wrap,
}) {
  return (
    <div className={cx(`cards-wrapper`, wrap ? "wrap" : "")}>
      {headTitle ? (
        <header className={cx("cards-wrapper__head")}>
          <h3 className={cx("cards-wrapper__head__title")}>{headTitle}</h3>
          <Button text to="/content-list/1">
            Xem thêm
          </Button>
        </header>
      ) : (
        ""
      )}
      <Row className={cx("cards-wrapper__cards")}>
        {data.map((card) => {
          return (
            <Col {...col} key={card.guid}>
              <CardFigure
                key={card.guid}
                to={`/comic/title/${card.guid}`}
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
    </div>
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
  headTitle: PropTypes.string,
  showTotalChapter: PropTypes.bool,
  showSummary: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showLike: PropTypes.bool,
  showView: PropTypes.bool,
  wrap: PropTypes.bool,
};

CardList.defaultProps = {
  col: {},
  headTitle: "",
  showTotalChapter: false,
  showSummary: false,
  showAuthor: true,
  showLike: true,
  showView: true,
  wrap: false,
};

export default memo(CardList);
