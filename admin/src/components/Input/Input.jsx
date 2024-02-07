import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { FormControl } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";

import { useTheme } from "@mui/material";
import CSSStyles from "./Input.module.scss";

const cx = classNames.bind(CSSStyles);

function Input({
  error,
  touched,

  width,
  height,

  name,
  value,
  onBlur,
  onChange,
  className,
  type,
  placeholder,
  maxLength,
  disabled,
  readOnly,
  letterCount,
  autoFocus,
}) {
  const theme = useTheme();
  const styles = {
    width,
    height,
    backgroundColor: "var(--island-background-color)",
    borderColor: theme.palette.mode === "light" ? "#ced4da" : "#888",
    color: theme.palette.text.primary,
  };

  return (
    <div className={cx("wrapper")}>
      <FormControl
        className={cx("input", className)}
        style={
          letterCount
            ? {
                ...styles,
                paddingRight: "100px",
              }
            : styles
        }
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        isInvalid={touched && !!error}
        autoFocus={autoFocus}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {letterCount && maxLength !== 0 && (
        <span className={cx("letter-counter")}>{`${value.length}/${maxLength}`}</span>
      )}
      <Feedback type="invalid">{error}</Feedback>
    </div>
  );
}

Input.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,

  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,

  type: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  letterCount: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  error: "",
  touched: false,

  width: "100%",
  height: "42px",

  name: "",
  onBlur: () => {},

  type: "text",
  placeholder: "",
  className: "",
  maxLength: 255,
  disabled: false,
  readOnly: false,
  letterCount: false,
  autoFocus: false,
};

export default Input;
