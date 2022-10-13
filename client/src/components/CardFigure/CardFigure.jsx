import Button from "components/Button";
import { Image } from "components/Image";
import PropTypes from "prop-types";
import { AiFillEye, AiFillHeart } from "react-icons/ai";

import { roundNumByUnit } from "utils";
import "./CardFigure.scss";

function CardFigure(props) {
  const {
    data,
    to,

    horizontal,

    summary,
    author,
    likeCount,
    viewCount,
  } = props;

  return (
    <Button
      wrapper
      to={to}
      className={`card-figure${horizontal ? " horizontal" : ""}`}
    >
      <Image src={data.coverImage} alt={data.titleName} />
      <figcaption className="card-figure__content">
        <div className="card-figure__content__wrapper">
          <h5 className="card-figure__content__title">{data.titleName}</h5>
          {summary && (
            <p className="card-figure__content__summary">{data.summary}</p>
          )}
        </div>

        <div className="card-figure__content__wrapper">
          {author && (
            <small className="card-figure__content__author">
              {data.authors}
            </small>
          )}
          {(likeCount || viewCount) && (
            <div className="card-figure__content__counting">
              {likeCount && (
                <span className="card-figure__content__counting__like like">
                  <AiFillHeart className="card-figure__content__counting__like__icon" />
                  <span>{roundNumByUnit(data.like)}</span>
                </span>
              )}
              {viewCount && (
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
    titleName: PropTypes.string.isRequired,
    coverImage: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    authors: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    ]),
    like: PropTypes.number.isRequired,
    view: PropTypes.number.isRequired,
  }).isRequired,
  to: PropTypes.string.isRequired,

  summary: PropTypes.bool,
  author: PropTypes.bool,
  likeCount: PropTypes.bool,
  viewCount: PropTypes.bool,

  horizontal: PropTypes.bool,
};

CardFigure.defaultProps = {
  summary: false,
  author: true,
  likeCount: true,
  viewCount: true,

  horizontal: false,
};

export default CardFigure;
