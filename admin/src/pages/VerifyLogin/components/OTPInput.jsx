import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "../styles/OTPInput.module.scss";

const cx = classNames.bind(styles);

function OTPInput({
  handleChangeOTP,
  handleKeyPress,
  firstDigitInputRef,
  setCurrentDigit,
  OTPValue,
}) {
  return (
    <div className={cx("otp-input")} id="otp-input">
      <input
        type="text"
        maxLength={1}
        className={cx("input", "otp-input-1", "active")}
        onChange={(e) => handleChangeOTP(0, e)}
        onKeyDown={handleKeyPress}
        onFocus={(e) => setCurrentDigit(e.target)}
        ref={firstDigitInputRef}
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
  handleChangeOTP: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  firstDigitInputRef: PropTypes.shape({}).isRequired,
  setCurrentDigit: PropTypes.func.isRequired,
  OTPValue: PropTypes.shape({
    digit1: PropTypes.string.isRequired,
    digit2: PropTypes.string.isRequired,
    digit3: PropTypes.string.isRequired,
    digit4: PropTypes.string.isRequired,
  }).isRequired,
};

export default OTPInput;
