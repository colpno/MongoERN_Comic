import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { notFoundSVG } from "assets/images";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={cx("wrapper")}>
      <img src={notFoundSVG} alt="vector" />
      <h1 className={cx("title")}>Trang không tồn tại</h1>
      {/* <p className={cx("message")}>
        Xin vui lòng quay lại hoặc về lại trang chủ.
      </p> */}
      <div className={cx("button-container")}>
        <Button outline onClick={() => navigate(-2)} className={cx("btn")}>
          Quay lại
        </Button>
        <Button primary to="/" className={cx("btn")}>
          Trang chủ
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
