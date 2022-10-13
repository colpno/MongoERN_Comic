import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./Radio.module.scss";

const cx = classNames.bind(styles);

function Radio({ field, disabled, value, children }) {
  return (
    <label className={cx("label")}>
      <input
        {...field}
        checked={field.value === value}
        type="radio"
        value={value}
        disabled={disabled}
        className={cx("radio")}
      />
      <span className={cx("custom-radio")} />
      {children}
    </label>
  );
}

Radio.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
};

Radio.defaultProps = {
  disabled: false,
};

export default Radio;
