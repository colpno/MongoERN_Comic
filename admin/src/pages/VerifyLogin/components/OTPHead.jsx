import PropTypes from "prop-types";
import classNames from "classnames/bind";

import { replaceAt } from "utils/stringMethods";
import styles from "../styles/OTPHead.module.scss";

const cx = classNames.bind(styles);

function OTPHead({ expiredCountdown, email }) {
  return (
    <div className={cx("head-container")}>
      <div className={cx("title")}>
        <p>Xác thực OTP</p>
      </div>
      <div className={cx("text")}>
        <p>Hãy điền mã OTP được gửi đến</p>
        <span className={cx("phone")}>
          {email && replaceAt(email, 3, email.indexOf("@") - 3, "********")}
        </span>
        <p>
          Mã OTP sẽ hết hạn trong {}
          <span className={cx("expire")}>{expiredCountdown}</span>
        </p>
      </div>
    </div>
  );
}

OTPHead.propTypes = {
  expiredCountdown: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default OTPHead;
