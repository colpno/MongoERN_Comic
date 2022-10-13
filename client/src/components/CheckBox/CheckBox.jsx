import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { ImCheckmark } from "react-icons/im";
import styles from "./CheckBox.module.scss";

const cx = classNames.bind(styles);

function CheckBox({ field, isChecked, value, disabled, children }) {
  return (
    <label className={cx("label")}>
      <input
        checked={Array.isArray(field.value) ? isChecked : field.value}
        {...field}
        value={value}
        type="checkbox"
        disabled={disabled}
        className={cx("checkbox")}
      />
      <span className={cx("custom-checkbox")}>
        <ImCheckmark className={cx("check-mark")} />
      </span>
      {children}
    </label>
  );
}

CheckBox.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string).isRequired,
      PropTypes.bool.isRequired,
    ]).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }),
  isChecked: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
};

CheckBox.defaultProps = {
  field: {},
  value: "",
  isChecked: false,
  disabled: false,
};

export default CheckBox;
