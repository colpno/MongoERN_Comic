import { useLike } from "hooks";
import PropTypes from "prop-types";
import { memo } from "react";

import { FaLightbulb, FaShareAlt } from "react-icons/fa";
import { ImHeart } from "react-icons/im";
import { MdFitScreen } from "react-icons/md";
import { useParams } from "react-router-dom";

function ReadingTools({ cx, darkTheme, handleChangeTheme }) {
  const { chapterId } = useParams();
  const { isLike, handleLike } = useLike(chapterId);

  return (
    <div className={cx("reading-header__tools")}>
      <FaLightbulb
        className={cx("reading-header__tools__theme", darkTheme ? "active" : "")}
        onClick={handleChangeTheme}
      />
      <ImHeart
        className={cx("reading-header__tools__like", isLike ? "active" : "")}
        onClick={handleLike}
      />
      <FaShareAlt className={cx("reading-header__tools__share")} />
      <MdFitScreen className={cx("reading-header__tools__fullscreen")} />
    </div>
  );
}

ReadingTools.propTypes = {
  cx: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  handleChangeTheme: PropTypes.func.isRequired,
};

export default memo(ReadingTools);
