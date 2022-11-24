/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { memo } from "react";

import { FaLightbulb, FaShareAlt } from "react-icons/fa";
import { ImHeart } from "react-icons/im";
import { MdFitScreen } from "react-icons/md";

function ReadingTools({
  cx,
  darkTheme,
  handleChangeTheme,
  isLike,
  handleLike,
}) {
  return (
    <div className={cx("reading-header__tools")}>
      {/* <FaLightbulb
        className={cx(
          "reading-header__tools__theme",
          darkTheme ? "active" : ""
        )}
        onClick={handleChangeTheme}
      /> */}
      <ImHeart
        className={cx("reading-header__tools__like", isLike ? "active" : "")}
        onClick={handleLike}
      />
      {/* <FaShareAlt className={cx("reading-header__tools__share")} />
      <MdFitScreen className={cx("reading-header__tools__fullscreen")} /> */}
    </div>
  );
}

ReadingTools.propTypes = {
  cx: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
  handleChangeTheme: PropTypes.func.isRequired,
  isLike: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default memo(ReadingTools);
