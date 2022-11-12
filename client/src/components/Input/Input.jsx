import PropTypes from "prop-types";
import { FormControl } from "react-bootstrap";
import classNames from "classnames/bind";
import Feedback from "react-bootstrap/esm/Feedback";

import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

function Input({
  field,
  type,
  className,
  error,
  touched,
  width,
  height,

  placeholder,
  maxLength,
  disabled,
  readOnly,
  letterCount,
  autoFocus,
}) {
  const { value } = field;

  return (
    <div className={cx("wrapper")}>
      <FormControl
        className={cx("input", className)}
        style={
          letterCount
            ? { paddingRight: "100px", width, height }
            : { width, height }
        }
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        isInvalid={touched && !!error}
        autoFocus={autoFocus}
        {...field}
      />
      {letterCount && maxLength !== 0 && (
        <span
          className={cx("letter-counter")}
        >{`${value.length}/${maxLength}`}</span>
      )}
      <Feedback type="invalid">{error}</Feedback>
    </div>
  );
}

Input.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  isInvalid: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,

  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  letterCount: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  error: "",
  touched: false,
  isInvalid: false,
  width: "100%",
  height: "42px",
  className: "",

  maxLength: 255,
  disabled: false,
  readOnly: false,
  letterCount: false,
  autoFocus: false,
};

export default Input;
