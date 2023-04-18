import PropTypes from "prop-types";
import { memo } from "react";
import { FaShareAlt } from "react-icons/fa";
import { ImHeart } from "react-icons/im";
import { MdFitScreen } from "react-icons/md";
import { useParams } from "react-router-dom";

import { DarkModeToggle } from "features";
import { useLike } from "hooks";

function ReadingTools({ cx }) {
  const { chapterId } = useParams();
  const { isLike, handleLike } = useLike(chapterId);

  return (
    <div className={cx("reading-header__tools")}>
      <DarkModeToggle />
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
};

export default memo(ReadingTools);
