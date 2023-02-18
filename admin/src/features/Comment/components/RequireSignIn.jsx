import classNames from "classnames/bind";
import { memo } from "react";

import { Button } from "components";
import styles from "../styles/RequireSignIn.module.scss";

const cx = classNames.bind(styles);

function RequireSignIn() {
  return (
    <p className={cx("sign-in")}>
      Bạn phải{" "}
      <Button text to="/login" className={cx("link")}>
        đăng nhập
      </Button>{" "}
      hoặc{" "}
      <Button text to="/register" className={cx("link")}>
        tạo tài khoản
      </Button>{" "}
      để bình luận hoặc trả lời.
    </p>
  );
}

export default memo(RequireSignIn);
