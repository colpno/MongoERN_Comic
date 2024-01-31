import PropTypes from "prop-types";
import { memo } from "react";
import { ImHeart } from "react-icons/im";

import { DarkModeToggle } from "features";

function ReadingTools({ cx, onToggleFavorite, controls }) {
  const { isFavored } = controls;

  return (
    <div className={cx("reading-header__tools")}>
      <DarkModeToggle />
      <ImHeart
        className={cx("reading-header__tools__like", isFavored ? "active" : "")}
        onClick={onToggleFavorite}
      />
      {/* <FaShareAlt className={cx("reading-header__tools__share")} />
      <MdFitScreen className={cx("reading-header__tools__fullscreen")} /> */}
    </div>
  );
}

ReadingTools.propTypes = {
  cx: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  controls: PropTypes.shape({
    isFavored: PropTypes.bool.isRequired,
  }).isRequired,
};

export default memo(ReadingTools);
