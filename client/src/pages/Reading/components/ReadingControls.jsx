import PropTypes from "prop-types";

import Button from "components/Button";
import { AiFillApple, AiFillHeart, AiFillStar } from "react-icons/ai";
import { FaShareAlt } from "react-icons/fa";

function ReadingControls({ cx, GGPlay }) {
  return (
    <div className={cx("reading-page__controls")}>
      <div className={cx("reading-page__controls__group")}>
        <Button
          className={cx("reading-page__controls__controls__group__control")}
        >
          <AiFillHeart />
          <span>Yêu thích</span>
        </Button>
        <Button
          className={cx("reading-page__controls__controls__group__control")}
        >
          <AiFillStar />
          <span>Theo dõi</span>
        </Button>
        <Button
          className={cx("reading-page__controls__controls__group__control")}
        >
          <FaShareAlt />
          <span>Chia sẻ</span>
        </Button>
      </div>
      <p className={cx("reading-page__text")}>
        Tất cả nội dung có thể được đọc thông qua ứng dụng ComicVN trên CH Play
        hoặc App store
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
      </div>
    </div>
  );
}

ReadingControls.propTypes = {
  cx: PropTypes.func.isRequired,
  GGPlay: PropTypes.string.isRequired,
};

export default ReadingControls;
