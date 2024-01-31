import PropTypes from "prop-types";
import { AiFillHeart, AiFillStar } from "react-icons/ai";

import { Button } from "components";
import { useToggleFavorite, useToggleFollow } from "hooks/index.jsx";

function ReadingControls({ cx, titleId, chapterId }) {
  const { handleToggle: handleToggleFavorite, isFavored } = useToggleFavorite(chapterId);
  const { handleToggle: handleToggleFollow, isFollowed } = useToggleFollow(titleId);

  return (
    <div className={cx("reading-page__controls")}>
      <div className={cx("reading-page__controls__group")}>
        <Button
          className={cx(
            "reading-page__controls__controls__group__control",
            "like",
            isFavored ? "active" : ""
          )}
          onClick={handleToggleFavorite}
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
          onClick={handleToggleFollow}
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
