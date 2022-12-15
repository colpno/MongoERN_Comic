import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";

import Button from "components/Button";
import CardList from "./CardList";
import Styles from "./CardList.module.scss";

const cx = classNames.bind(Styles);

function CardListWithTitle({
  col,
  data,
  genre,
  showTotalChapter,
  showSummary,
  showAuthor,
  showLike,
  showView,
  wrap,
}) {
  return (
    <div className={cx(`cards-wrapper`, wrap ? "wrap" : "")}>
      <header className={cx("cards-wrapper__head")}>
        <h3 className={cx("cards-wrapper__head__title")}>{genre.name}</h3>
        <Button text to={`/content-list/${genre.guid}`}>
          Xem thêm
        </Button>
      </header>
      <CardList
        col={col}
        data={data}
        showTotalChapter={showTotalChapter}
        showSummary={showSummary}
        showAuthor={showAuthor}
        showLike={showLike}
        showView={showView}
      />
    </div>
  );
}

CardListWithTitle.propTypes = {
  col: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
  }),
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  genre: PropTypes.shape({
    guid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  showTotalChapter: PropTypes.bool,
  showSummary: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showLike: PropTypes.bool,
  showView: PropTypes.bool,
  wrap: PropTypes.bool,
};

CardListWithTitle.defaultProps = {
  col: {},
  showTotalChapter: false,
  showSummary: false,
  showAuthor: true,
  showLike: true,
  showView: true,
  wrap: false,
};

export default memo(CardListWithTitle);
