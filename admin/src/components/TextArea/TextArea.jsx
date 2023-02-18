import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Feedback from "react-bootstrap/esm/Feedback";
import { FormControl } from "react-bootstrap";

import styles from "./TextArea.module.scss";

const cx = classNames.bind(styles);

function TextArea({
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,

  placeholder,
  maxLength,
  readOnly,
  rows,
}) {
  return (
    <div className={cx("wrapper")}>
      <FormControl
        as="textarea"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
        placeholder={placeholder}
        readOnly={readOnly}
        isInvalid={touched && !!error}
        className={cx("textarea")}
        maxLength={maxLength}
      />
      <span
        className={cx("text-length")}
      >{`${value.length}/${maxLength}`}</span>
      <Feedback type="invalid">{error}</Feedback>
    </div>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  error: PropTypes.string,
  touched: PropTypes.bool,

  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  rows: PropTypes.number,
};

TextArea.defaultProps = {
  onBlur: () => {},
  form: {},
  error: "",
  touched: false,

  placeholder: "",
  maxLength: 1000,
  readOnly: false,
  rows: 5,
};

export default TextArea;
