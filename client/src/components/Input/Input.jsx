import PropTypes from "prop-types";
import { FormControl } from "react-bootstrap";
import classNames from "classnames/bind";

import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

function Input({
  field,
  type,
  placeholder,
  maxLength,
  disabled,
  isInvalid,
  readOnly,
  letterCount,
  width,
  height,
  className,
}) {
  const { value } = field;

  return (
    <div style={{ width, height }}>
      <FormControl
        {...field}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        isInvalid={isInvalid}
        className={cx("input", className)}
        style={letterCount ? { paddingRight: "100px" } : {}}
      />
      {letterCount && maxLength !== 0 && (
        <span
          className={cx("letter-counter")}
        >{`${value.length}/${maxLength}`}</span>
      )}
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
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
  readOnly: PropTypes.bool,
  letterCount: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
  maxLength: 255,
  disabled: false,
  isInvalid: false,
  readOnly: false,
  letterCount: false,
  width: "100%",
  height: "100%",
  className: "",
};

export default Input;
