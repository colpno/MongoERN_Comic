import classNames from "classnames/bind";
import { Button } from "components";

import { notFoundSVG } from "assets/images";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
  return (
    <div className={cx("wrapper")}>
      <img src={notFoundSVG} alt="vector" />
      <h1 className={cx("title")}>Trang không tồn tại</h1>
      <p className={cx("message")}>
        {/* Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id sit
        inventore eveniet cumque alias. */}
        Xin vui lòng quay lại hoặc về lại trang chủ.
      </p>
      <Button primary to="/" className={cx("btn")}>
        Trang chủ
      </Button>
    </div>
  );
}

export default NotFound;
