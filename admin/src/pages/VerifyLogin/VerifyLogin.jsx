import classNames from "classnames/bind";
import Cookies from "js-cookie";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { Popup } from "features";
import { usePopup, useToast } from "hooks";
import { setLoginInfo as setLoginInfoStore } from "libs/redux/slices/login.slice";
import { setUser } from "libs/redux/slices/user.slice";
import { authService } from "services";
import Numpad from "./components/Numpad";
import OTPHead from "./components/OTPHead";
import OTPInput from "./components/OTPInput";
import ReSend from "./components/ReSend";
import styles from "./styles/VerifyLogin.module.scss";

const cx = classNames.bind(styles);

function VerifyLogin() {
  const RE_SEND_TIME = 5;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Toast, options, toastEmitter } = useToast();

  const reSendCountdownRef = useRef(null);
  const expiredCountdownRef = useRef(null);
  const firstDigitInputRef = useRef(0);

  const [loginInfo, setLoginInfo] = useState({
    id: "",
    email: "",
    username: "",
    expiredAt: "",
  });
  const [currentDigit, setCurrentDigit] = useState(null);
  const [reSend, setReSend] = useState({
    disable: true,
    countdown: RE_SEND_TIME,
  });
  const [expiredCountdown, setExpiredCountdown] = useState("59:99");
  const [OTPValue, setOTPValue] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
  });
  const { popup, setPopup, triggerPopup } = usePopup();

  const handleSubmit = () => {
    const OTPKeys = Object.keys(OTPValue);

    // get the otp of all slots and concat
    const OTPString = OTPKeys.reduce((str, key) => `${str}${OTPValue[key]}`, "");

    // if the all inserted otp don't match total of otp slots
    if (OTPString.length !== OTPKeys.length) {
      toastEmitter("Mã OTP không hợp lệ", "error");
      return;
    }

    const { id, username, email } = loginInfo;

    if (!!id && !!username && !!email) {
      authService
        .verifyLogin(id, username, email, OTPString)
        .then((response) => {
          // save user's account info to redux
          dispatch(setUser(response.data));

          toastEmitter("Đăng nhập thành công", "success");

          setTimeout(() => {
            navigate("/titles");
          }, 1000);
        })
        .catch((error) => toastEmitter(error, "error"));
    }
  };

  const handleNumpadClick = (e) => {
    const { target } = e;

    // the number present to the pressed key
    const number = target.getAttribute("data-key");

    // digit position
    const digit = currentDigit.getAttribute("data-digit");

    setOTPValue((prev) => ({
      ...prev,
      [`digit${digit}`]: number,
    }));

    const nextSibling = currentDigit.nextElementSibling;

    // if current focus ele has next sibling
    if (nextSibling) {
      // move focus to that one
      nextSibling.focus();
    } else {
      // else still focus on current one (reach end)
      currentDigit.focus();
    }
  };

  const handleNumpadClear = () => {
    const digit = currentDigit.getAttribute("data-digit");

    // if current focus ele has value
    if (currentDigit.value !== "") {
      // remove its value
      setOTPValue((prev) => ({
        ...prev,
        [`digit${digit}`]: "",
      }));

      currentDigit.focus();
    }

    // if current focus ele empty
    if (currentDigit.value === "") {
      const prevSibling = currentDigit.previousElementSibling;

      // and has previous sibling
      if (prevSibling) {
        // remove its value
        setOTPValue((prev) => ({
          ...prev,
          [`digit${digit - 1}`]: "",
        }));

        // focus to the previous sibling
        prevSibling.focus();
      }

      // if reach beginning
      if (!prevSibling) {
        // always focus on the first one
        currentDigit.focus();
      }
    }
  };

  const handleChangeOTP = (digitPosition, e) => {
    const { value } = e.target;

    // check if value user insert is number
    const match = value.match(/^(\s*|\d+)$/);
    if (!match) {
      toastEmitter("Mã OTP phải là số", "error");
      return;
    }

    // get next sibling of the current focus one
    const nextSibling = e.target.nextElementSibling;

    // set value to current focus element
    setOTPValue((prev) => ({
      ...prev,
      [`digit${digitPosition + 1}`]: value,
    }));

    if (currentDigit.value.length !== 0) {
      // if next sibling exist, move focus to that sibling
      nextSibling && nextSibling.focus();
    }
  };

  const handleKeyPress = (e) => {
    const { keyCode, target } = e;
    const BACK_SPACE = 8;
    const NUMPAD_0 = 48;
    const NUMPAD_9 = 57;

    // if user press back space
    if (keyCode === BACK_SPACE && target.value.length === 0) {
      const prevSibling = target.previousElementSibling;

      // if current focus element has previous sibling
      if (prevSibling) {
        // get current focus element digit position total of 4 digits
        const digit = prevSibling.getAttribute("data-digit");

        // remove text of the current focus element
        setOTPValue((prev) => ({
          ...prev,
          [`digit${digit}`]: "",
        }));

        // move focus to previous sibling
        prevSibling.focus();
      }
    }

    // if user press key 0 to 9 in numpad
    if (keyCode >= NUMPAD_0 && keyCode <= NUMPAD_9 && target.value.length !== 0) {
      // get current focus element digit position total of 4 digits
      const digit = currentDigit.getAttribute("data-digit");

      // insert the number of pressed key
      setOTPValue((prev) => ({
        ...prev,
        [`digit${digit}`]: keyCode - NUMPAD_0,
      }));
    }
  };

  const handleReSend = () => {
    const { id, username, email } = loginInfo;

    authService
      .sendOTP(id, username, email)
      .then((response) => {
        dispatch(setLoginInfoStore(response.data));
        toastEmitter(response.message, "success");
      })
      .catch((error) => console.error(error));

    setReSend((prev) => ({ ...prev, disable: true }));
  };

  const startExpiredCountdown = () => {
    expiredCountdownRef.current = setInterval(() => {
      // Get difference of expired time and now in milliseconds
      const expiredTimeInMilliSecond = moment(loginInfo.expiredAt).diff(moment());

      // Format to mm:ss
      const formattedTime = moment(expiredTimeInMilliSecond).format("mm:ss");
      setExpiredCountdown(formattedTime);
    }, 1000);
  };

  const stopExpiredCountdown = () => {
    clearInterval(expiredCountdownRef.current);
  };

  const startReSendTimer = () => {
    let minus = 0;

    reSendCountdownRef.current = setInterval(() => {
      setReSend((prev) => ({ ...prev, countdown: RE_SEND_TIME - minus }));
      minus += 1;
    }, 1000);
  };

  const stopReSendTimer = () => {
    clearInterval(reSendCountdownRef.current);
  };

  // Expired timer
  useEffect(() => {
    loginInfo.expiredAt !== "" && startExpiredCountdown();

    return () => {
      stopExpiredCountdown();
    };
  }, [loginInfo.expiredAt]);

  // If the expired timer count to 0
  useEffect(() => {
    const seconds = moment.duration(expiredCountdown).asSeconds();

    if (seconds <= 0) {
      // stop the expired timer
      stopExpiredCountdown();

      //  show pop up
      setPopup({
        isShown: true,
        title: "Thông báo",
        content: "Mã OTP đã hết hạn, vui lòng đăng nhập lại.",
        onConfirm: () => navigate(-1),
      });
    }
  }, [expiredCountdown]);

  // Whenever re-send otp button is disabled
  useEffect(() => {
    if (reSend.disable) {
      // reset time of the timer
      setReSend((prev) => ({ ...prev, countdown: RE_SEND_TIME }));

      // start the timer
      startReSendTimer();
    }

    return () => {
      stopReSendTimer();
    };
  }, [reSend.disable]);

  // If re-send timer down to 0
  useEffect(() => {
    if (reSend.countdown <= 0) {
      // stop the timer
      stopReSendTimer();

      // enable re-send button
      setReSend((prev) => ({ ...prev, disable: false }));
    }
  }, [reSend.countdown]);

  // Get cookie and check if exist
  useEffect(() => {
    const loginInfoCookie = Cookies.get("loginInfo");

    // If loginInfo existed in cookie
    if (loginInfoCookie) {
      setLoginInfo(JSON.parse(loginInfoCookie));
    } else {
      // else navigate to login
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const OTPKeys = Object.keys(OTPValue);

    const areAllDigitsNotEmpty = OTPKeys.every((digit) => OTPValue[digit] !== "");

    if (areAllDigitsNotEmpty) {
      handleSubmit();
    }
  }, [OTPValue]);

  return (
    <>
      <div className={cx("container-content")}>
        <div className={cx("otp-container")}>
          <OTPHead cx={cx} expiredCountdown={expiredCountdown} email={loginInfo.email} />
          <OTPInput
            cx={cx}
            handleChangeOTP={handleChangeOTP}
            handleKeyPress={handleKeyPress}
            firstDigitInputRef={firstDigitInputRef}
            setCurrentDigit={setCurrentDigit}
            OTPValue={OTPValue}
          />
          <Button primary className={cx("btn-verify")} onClick={handleSubmit}>
            Xác thực <BsBoxArrowInRight className={cx("icon")} />
          </Button>
          <ReSend
            cx={cx}
            isDisabled={reSend.disable}
            handleReSend={handleReSend}
            countdown={reSend.countdown}
          />
          <Numpad
            cx={cx}
            handleNumpadClick={handleNumpadClick}
            handleNumpadClearClick={handleNumpadClear}
          />
        </div>
      </div>
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} />}
      <Toast {...options} />
    </>
  );
}

export default VerifyLogin;
