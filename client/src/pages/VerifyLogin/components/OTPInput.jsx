import classNames from "classnames/bind";
import { emitToast } from "features/Toast.jsx";
import PropTypes from "prop-types";
import { memo } from "react";
import styles from "../styles/OTPInput.module.scss";

const cx = classNames.bind(styles);

function OTPInput({ setCurrentDigit, OTPValue, setOTPValue, currentDigit }) {
  const handleChangeOTP = (digitPosition, e) => {
    const { value } = e.target;

    // check if value user insert is number
    const match = value.match(/^(\s*|\d+)$/);
    if (!match) {
      emitToast("Mã OTP phải là số", "error");
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

  return (
    <div className={cx("otp-input")} id="otp-input">
      <input
        type="text"
        maxLength={1}
        className={cx("input", "otp-input-1", "active")}
        onChange={(e) => handleChangeOTP(0, e)}
        onKeyDown={handleKeyPress}
        onFocus={(e) => setCurrentDigit(e.target)}
        value={OTPValue.digit1}
        data-digit={1}
        autoFocus
      />
      <input
        type="text"
        maxLength={1}
        className={cx("input", "otp-input-2")}
        onChange={(e) => handleChangeOTP(1, e)}
        onKeyDown={handleKeyPress}
        onFocus={(e) => setCurrentDigit(e.target)}
        value={OTPValue.digit2}
        data-digit={2}
      />
      <input
        type="text"
        maxLength={1}
        className={cx("input", "otp-input-3")}
        onChange={(e) => handleChangeOTP(2, e)}
        onKeyDown={handleKeyPress}
        onFocus={(e) => setCurrentDigit(e.target)}
        value={OTPValue.digit3}
        data-digit={3}
      />
      <input
        type="text"
        maxLength={1}
        className={cx("input", "otp-input-4")}
        onChange={(e) => handleChangeOTP(3, e)}
        onKeyDown={handleKeyPress}
        onFocus={(e) => setCurrentDigit(e.target)}
        value={OTPValue.digit4}
        data-digit={4}
      />
    </div>
  );
}

OTPInput.propTypes = {
  setCurrentDigit: PropTypes.func.isRequired,
  OTPValue: PropTypes.shape({
    digit1: PropTypes.string.isRequired,
    digit2: PropTypes.string.isRequired,
    digit3: PropTypes.string.isRequired,
    digit4: PropTypes.string.isRequired,
  }).isRequired,
  setOTPValue: PropTypes.func.isRequired,
  currentDigit: PropTypes.shape({
    getAttribute: PropTypes.func,
    nextElementSibling: PropTypes.shape({
      focus: PropTypes.func,
    }),
    previousElementSibling: PropTypes.shape({
      focus: PropTypes.func,
    }),
    focus: PropTypes.func,
    value: PropTypes.string,
  }),
};

OTPInput.defaultProps = {
  currentDigit: null,
};

export default memo(OTPInput);
