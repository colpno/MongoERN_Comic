import PropTypes from "prop-types";
import { memo } from "react";
import { AiFillEye, AiFillHeart } from "react-icons/ai";

import { Button, Image } from "components";
import { roundNumByUnit } from "utils";
import "./CardFigure.scss";

function CardFigure(props) {
  const {
    data,
    to,

    horizontal,

    showTotalChapter,
    showSummary,
    showAuthor,
    showLike,
    showView,
  } = props;

  return (
    <Button wrapper to={to} className={`card-figure${horizontal ? " horizontal" : ""}`}>
      <Image src={data.cover.source} alt={data.title} className="card-figure__image" />
      <figcaption className="card-figure__content">
        <div className="card-figure__content__wrapper">
          <h5 className="card-figure__content__title">{data.title}</h5>
          {showSummary && <p className="card-figure__content__summary">{data.summary}</p>}
        </div>

        <div className="card-figure__content__wrapper">
          {showTotalChapter && (
            <small className="card-figure__content__total-chapter">
              {data.total_chapter} chương
            </small>
          )}
          {showAuthor && <small className="card-figure__content__author">{data.author}</small>}
          {(showLike || showView) && (
            <div className="card-figure__content__counting">
              {showLike && (
                <span className="card-figure__content__counting__like like">
                  <AiFillHeart className="card-figure__content__counting__like__icon" />
                  <span>{roundNumByUnit(data.like)}</span>
                </span>
              )}
              {showView && (
                <span className="card-figure__content__counting__view view">
                  <AiFillEye className="card-figure__content__counting__eye__icon" />
                  <span>{roundNumByUnit(data.view)}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </figcaption>
    </Button>
  );
}

CardFigure.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      source: PropTypes.string.isRequired,
    }).isRequired,
    summary: PropTypes.string.isRequired,
    total_chapter: PropTypes.number.isRequired,
    author: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    ]),
    like: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
  }).isRequired,
  to: PropTypes.string.isRequired,

  showTotalChapter: PropTypes.bool,
  showSummary: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showLike: PropTypes.bool,
  showView: PropTypes.bool,

  horizontal: PropTypes.bool,
};

CardFigure.defaultProps = {
  showTotalChapter: false,
  showSummary: false,
  showAuthor: true,
  showLike: true,
  showView: true,

  horizontal: false,
};

export default memo(CardFigure);
