import classNames from "classnames/bind";
import cookies from "js-cookie";
import { useEffect, useRef, useState } from "react";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { Popup } from "features";
import { useToast } from "hooks";
import { login as dispatchLogin } from "libs/redux/slices/userSlice";
import { loginOTP, reSendOTP } from "services/auth";
import { convertUserPropertyToString } from "utils/convertArrayPropertyToString";
import { replaceAt } from "utils/stringMethods";
import NumPad from "./components/NumPad";
import styles from "./LoginOTP.module.scss";

const cx = classNames.bind(styles);

function LoginOTP() {
  const COUNT_DOWN_TIME = 5;
  const navigate = useNavigate();
  const [currentDigit, setCurrentDigit] = useState(null);
  const [reSend, setReSend] = useState({
    disable: true,
    countdown: COUNT_DOWN_TIME,
  });
  const dispatch = useDispatch();
  const { Toast, options, toastEmitter } = useToast();
  const countdownRef = useRef();
  const firstDigitInputRef = useRef(0);
  const [OTPInput, setOTPInput] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
    isClosed: false,
  });
  const [loginInfo, setLoginInfo] = useState({ email: "", userGuid: "" });

  useEffect(() => {
    const cookie = cookies.get("loginInfo");
    if (cookie) {
      const { email, userGuid } = JSON.parse(cookie);
      setLoginInfo({ email, userGuid });
    } else {
      setPopup((prev) => ({
        ...prev,
        trigger: true,
        content: "Bạn không thể vào trang này khi chưa thực hiện đăng nhập",
      }));
    }
  }, []);

  useEffect(() => {
    popup.isClosed && navigate(-1);
  }, [popup.isClosed]);

  useEffect(() => {
    if (reSend.disable) {
      setTimeout(() => {
        setReSend((prev) => ({ ...prev, disable: false }));
      }, reSend.countdown * 1000);

      countdownRef.current = setInterval(() => {
        setReSend((prev) => ({ ...prev, countdown: prev.countdown - 1 }));
      }, 1000);
    }

    return () => clearInterval(countdownRef.current);
  }, [reSend.disable]);

  if (reSend.countdown <= 0) {
    clearInterval(countdownRef.current);
  }

  const handleNumpadClick = (e) => {
    const { target } = e;
    const number = target.getAttribute("data-key");
    const digit = currentDigit.getAttribute("data-digit");

    setOTPInput((prev) => ({
      ...prev,
      [`digit${digit}`]: number,
    }));

    const nextSibling = currentDigit.nextElementSibling;
    if (nextSibling) {
      nextSibling.focus();
    } else {
      currentDigit.focus();
    }
  };

  const handleNumpadClearClick = () => {
    const digit = currentDigit.getAttribute("data-digit");

    if (currentDigit.value !== "") {
      setOTPInput((prev) => ({
        ...prev,
        [`digit${digit}`]: "",
      }));

      currentDigit.focus();
    }

    if (currentDigit.value === "") {
      const prevSibling = currentDigit.previousElementSibling;

      if (prevSibling) {
        setOTPInput((prev) => ({
          ...prev,
          [`digit${digit - 1}`]: "",
        }));

        prevSibling.focus();
      }

      if (!prevSibling) {
        currentDigit.focus();
      }
    }
  };

  const handleChangeOTP = (digitPosition, e) => {
    const { value } = e.target;

    const match = value.match(/^(\s*|\d+)$/);
    if (!match) {
      toastEmitter("Mã OTP phải là số", "error");
      return;
    }

    const nextSibling = e.target.nextElementSibling;

    if (currentDigit.value.length !== 0) {
      setOTPInput((prev) => ({
        ...prev,
        [`digit${digitPosition + 1}`]: value,
      }));

      nextSibling && nextSibling.focus();
    }
    if (currentDigit.value.length === 0) {
      setOTPInput((prev) => ({
        ...prev,
        [`digit${digitPosition + 1}`]: value,
      }));
    }
  };

  const handlePressBackSpace = (e) => {
    const { keyCode, target } = e;
    if (keyCode === 8 && target.value.length === 0) {
      const prevSibling = target.previousElementSibling;

      if (prevSibling) {
        const digit = prevSibling.getAttribute("data-digit");

        setOTPInput((prev) => ({
          ...prev,
          [`digit${digit}`]: "",
        }));

        prevSibling.focus();
      }
    }
    const UNICODE_OF_0 = 48;
    const UNICODE_OF_9 = 57;
    if (
      keyCode >= UNICODE_OF_0 &&
      keyCode <= UNICODE_OF_9 &&
      target.value.length !== 0
    ) {
      const digit = currentDigit.getAttribute("data-digit");

      setOTPInput((prev) => ({
        ...prev,
        [`digit${digit}`]: keyCode - UNICODE_OF_0,
      }));
    }
  };

  const handleVerify = () => {
    const OTPKeys = Object.keys(OTPInput);

    const OTPString = OTPKeys.reduce(
      (str, key) => `${str}${OTPInput[key]}`,
      ""
    );

    if (OTPString.length !== OTPKeys.length) {
      toastEmitter("Mã OTP không hợp lệ", "error");
      return;
    }

    if (loginInfo.email && OTPString) {
      const data = {
        email: loginInfo.email,
        userGuid: loginInfo.userGuid,
        otp: OTPString,
      };

      loginOTP(data)
        .then((response) => {
          if (response) {
            const converted = convertUserPropertyToString(response);
            dispatch(dispatchLogin(converted));
            toastEmitter("Đăng nhập thành công", "success");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleReSend = () => {
    reSendOTP()
      .then((response) => {
        if (response) {
          toastEmitter(response, "success");
        }
      })
      .catch((error) => console.log(error));

    setReSend(() => ({ countdown: COUNT_DOWN_TIME, disable: true }));
  };

  return (
    <>
      <div className={cx("container-content")}>
        <div className={cx("otp-container")}>
          <div className={cx("title")}>
            <p>Xác thực OTP</p>
          </div>
          <div className={cx("text")}>
            <p>Hãy điền mã OTP được gửi đến</p>
            <span className={cx("phone")}>
              {loginInfo.email &&
                replaceAt(
                  loginInfo.email,
                  3,
                  loginInfo.email.indexOf("@") - 3,
                  "********"
                )}
            </span>
            {/* <p>
              The OTPInput will expire in
              <span className={cx("expire", "text-dark")}>30s</span>
            </p> */}
          </div>
          <div className={cx("otp-input")} id="otp-input">
            <input
              type="text"
              maxLength={1}
              className={cx("input", "otp-input-1", "active")}
              onChange={(e) => handleChangeOTP(0, e)}
              onKeyDown={handlePressBackSpace}
              onFocus={(e) => setCurrentDigit(e.target)}
              ref={firstDigitInputRef}
              value={OTPInput.digit1}
              data-digit={1}
              autoFocus
            />
            <input
              type="text"
              maxLength={1}
              className={cx("input", "otp-input-2")}
              onChange={(e) => handleChangeOTP(1, e)}
              onKeyDown={handlePressBackSpace}
              onFocus={(e) => setCurrentDigit(e.target)}
              value={OTPInput.digit2}
              data-digit={2}
            />
            <input
              type="text"
              maxLength={1}
              className={cx("input", "otp-input-3")}
              onChange={(e) => handleChangeOTP(2, e)}
              onKeyDown={handlePressBackSpace}
              onFocus={(e) => setCurrentDigit(e.target)}
              value={OTPInput.digit3}
              data-digit={3}
            />
            <input
              type="text"
              maxLength={1}
              className={cx("input", "otp-input-4")}
              onChange={(e) => handleChangeOTP(3, e)}
              onKeyDown={handlePressBackSpace}
              onFocus={(e) => setCurrentDigit(e.target)}
              value={OTPInput.digit4}
              data-digit={4}
            />
          </div>
          <span className={cx("text-danger")} />
          <Button primary className={cx("btn-verify")} onClick={handleVerify}>
            Xác thực <BsBoxArrowInRight className={cx("icon")} />
          </Button>
          <div className={cx("resend-code", "text-muted")}>
            Chưa nhận được?
            <Button
              wrapper
              disabled={reSend.disable}
              className={cx("btn-resend")}
              onClick={handleReSend}
            >
              Gửi lại
            </Button>
            {reSend.countdown !== 0 && (
              <div className={cx("countdown")}>{reSend.countdown}</div>
            )}
          </div>
          <NumPad
            cx={cx}
            handleNumpadClick={handleNumpadClick}
            handleNumpadClearClick={handleNumpadClearClick}
          />
        </div>
      </div>
      <Popup popup={popup} setPopup={setPopup} />
      <Toast {...options} />
    </>
  );
}

export default LoginOTP;