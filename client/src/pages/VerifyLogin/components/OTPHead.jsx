/* eslint-disable no-unused-vars */
import classNames from "classnames/bind";
import { Popup } from "features/index.jsx";
import { usePopup } from "hooks/index.jsx";
import useCountdown from "hooks/useCountdown.jsx";
import moment from "moment";
import PropTypes from "prop-types";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { replaceAt } from "utils/stringMethods";
import styles from "../styles/OTPHead.module.scss";

const cx = classNames.bind(styles);

function OTPHead({ loginInfo }) {
  const navigate = useNavigate();
  const { popup, setPopup, triggerPopup } = usePopup();
  const { email, expiredAt } = loginInfo;
  const { countdownTime } = useCountdown({
    initialTime: expiredAt ? moment.duration(moment(expiredAt)).asMilliseconds() : undefined,
    format: "mm:ss",
    autoStartCountdown: true,
    compareToCurrentTime: true,
    onExpired: () => {
      setPopup({
        isTriggered: true,
        title: "Thông báo",
        content: "Mã OTP đã hết hạn, vui lòng đăng nhập lại.",
      });
    },
  });

  // Expired popup is closed, user will be navigated to previous page
  // useEffect(() => {
  //   popup.isClosed && navigate(-1);
  // }, [popup.isClosed, navigate]);

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
          <span className={cx("expire", "text-dark")}>{countdownTime}</span>
        </p>
      </div>
      <Popup data={popup} trigger={triggerPopup} />
    </div>
  );
}

OTPHead.propTypes = {
  loginInfo: PropTypes.shape({
    email: PropTypes.string,
    expiredAt: PropTypes.string,
  }).isRequired,
};

export default memo(OTPHead);
