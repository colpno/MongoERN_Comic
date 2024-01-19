import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { memo } from "react";

import { Button, HeadTitleMark } from "components";
import CardList from "./CardList";
import Styles from "./CardList.module.scss";

const cx = classNames.bind(Styles);

function CardListWithTitle({
  col,
  data,
  showTotalChapter,
  showSummary,
  showAuthor,
  showLike,
  showView,
  wrap,
  dropRow,
}) {
  return (
    <div className={cx(`cards-wrapper`, wrap ? "wrap" : "")}>
      <HeadTitleMark>
        <header className={cx("cards-wrapper__head")}>
          <h3 className={cx("cards-wrapper__head__title")}>{data.name}</h3>
          {data._id ? (
            <Button text to={`/content-list/${data._id}`} className={cx("btn--more")}>
              Xem thêm
            </Button>
          ) : null}
        </header>
      </HeadTitleMark>
      <CardList
        col={col}
        data={data.titles}
        showTotalChapter={showTotalChapter}
        showSummary={showSummary}
        showAuthor={showAuthor}
        showLike={showLike}
        showView={showView}
        dropRow={dropRow}
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
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    titles: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  }).isRequired,
  showTotalChapter: PropTypes.bool,
  showSummary: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showLike: PropTypes.bool,
  showView: PropTypes.bool,
  wrap: PropTypes.bool,
  dropRow: PropTypes.bool,
};

CardListWithTitle.defaultProps = {
  col: {},
  showTotalChapter: false,
  showSummary: false,
  showAuthor: true,
  showLike: true,
  showView: true,
  wrap: false,
  dropRow: true,
};

export default memo(CardListWithTitle);
