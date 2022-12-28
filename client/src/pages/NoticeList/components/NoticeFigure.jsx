import classNames from "classnames/bind";
import PropTypes from "prop-types";

import styles from "../styles/NoticeFigure.module.scss";

const cx = classNames.bind(styles);

function NoticeFigure({ data }) {
  const { title, cover, content } = data;

  return (
    <figure className={cx("notice-figure")}>
      <div className={cx("box-img")}>
        <img src={cover} alt={title} />
      </div>
      <figcaption className={cx("notice-figure__content")}>
        <h5 className={cx("title")}>{title}</h5>
        <small className={cx("content")}>{content}</small>
      </figcaption>
    </figure>
  );
}

NoticeFigure.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoticeFigure;
