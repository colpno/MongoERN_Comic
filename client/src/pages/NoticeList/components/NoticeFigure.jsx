import classNames from "classnames/bind";
import PropTypes from "prop-types";

import moment from "moment";
import { AiOutlineClockCircle } from "react-icons/ai";
import styles from "../styles/NoticeFigure.module.scss";

const cx = classNames.bind(styles);

function NoticeFigure({ data }) {
  const { title, cover, updatedAt } = data;

  return (
    <figure className={cx("notice-figure")}>
      <div className={cx("box-img")}>
        <img src={cover.source} alt={title} />
      </div>
      <figcaption className={cx("notice-figure__content")}>
        <p className={cx("update-time")}>
          <AiOutlineClockCircle />
          <small>{moment(updatedAt).format("DD.MM.YYYY HH:mm")}</small>
        </p>
        <h5 className={cx("title")}>{title}</h5>
      </figcaption>
    </figure>
  );
}

NoticeFigure.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover: PropTypes.shape({
      source: PropTypes.string.isRequired,
    }),
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoticeFigure;
