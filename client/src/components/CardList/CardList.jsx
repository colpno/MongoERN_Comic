/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { memo } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import Button from "components/Button";
import CardFigure from "components/CardFigure/CardFigure";
import Styles from "./CardList.module.scss";

const cx = classNames.bind(Styles);

function CardList(props) {
  const { col, data, headTitle, summary, author, likeCount, viewCount } = props;

  return (
    <div className={cx(`cards-wrapper`)}>
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
                summary={summary}
                author={author}
                likeCount={likeCount}
                viewCount={viewCount}
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
  summary: PropTypes.bool,
  author: PropTypes.bool,
  likeCount: PropTypes.bool,
  viewCount: PropTypes.bool,
};
CardList.defaultProps = {
  col: {},
  headTitle: "",
  summary: false,
  author: true,
  likeCount: true,
  viewCount: true,
};

export default memo(CardList);
