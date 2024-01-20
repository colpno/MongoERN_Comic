/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { AiFillApple, AiFillHeart, AiFillStar } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";

import { Button } from "components";
import { useFollow, useLike } from "hooks";
import GGPlay from "../assets/images/icons8-google-play-48.png";

function ReadingControls({ cx, titleId, chapterId }) {
  const { handleLike, isLike } = useLike(chapterId);
  const { handleFollow, isFollowed } = useFollow(titleId);

  return (
    <div className={cx("reading-page__controls")}>
      <div className={cx("reading-page__controls__group")}>
        <Button
          className={cx(
            "reading-page__controls__controls__group__control",
            "like",
            isLike ? "active" : ""
          )}
          onClick={handleLike}
        >
          <AiFillHeart className={cx("icon")} />
          <span className={cx("text")}>Yêu thích</span>
        </Button>
        <Button
          className={cx(
            "reading-page__controls__controls__group__control",
            "follow",
            isFollowed ? "active" : ""
          )}
          onClick={handleFollow}
        >
          <AiFillStar className={cx("icon")} />
          <span className={cx("text")}>Theo dõi</span>
        </Button>
        {/* <Button className={cx("reading-page__controls__controls__group__control")}>
          <FaShareAlt />
          <span>Chia sẻ</span>
        </Button> */}
      </div>
      {/* <p className={cx("reading-page__text")}>
        Tất cả nội dung có thể được đọc thông qua ứng dụng ComicVN trên CH Play hoặc App store
      </p>
      <div className={cx("reading-page__download-app")}>
        <Button className={cx("reading-page__download-app__button")}>
          <img src={GGPlay} alt="Google Play" />
          <span>Google Play</span>
        </Button>
        <Button className={cx("reading-page__download-app__button")}>
          <AiFillApple />
          <span>App Store</span>
        </Button>
      </div> */}
    </div>
  );
}

ReadingControls.propTypes = {
  cx: PropTypes.func.isRequired,
  titleId: PropTypes.string.isRequired,
  chapterId: PropTypes.string.isRequired,
};

export default ReadingControls;
