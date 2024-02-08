import PropTypes from "prop-types";
import { memo } from "react";
import { ImHeart } from "react-icons/im";

// import { DarkModeToggle } from "features";

function ReadingTools({ cx, onToggleFavorite, controls, chapter, user }) {
  const { isFavored } = controls;

  return (
    <div className={cx("reading-header__tools")}>
      {/* <DarkModeToggle /> */}
      {chapter.user_id !== user._id && (
        <ImHeart
          className={cx("reading-header__tools__like", isFavored ? "active" : "")}
          onClick={onToggleFavorite}
        />
      )}
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
  chapter: PropTypes.shape({
    user_id: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(ReadingTools);
