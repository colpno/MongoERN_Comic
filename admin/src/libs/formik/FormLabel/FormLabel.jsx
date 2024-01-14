import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./FormLabel.module.scss";

const cx = classNames.bind(styles);

function FormLabel({ name, label, subLabel, required }) {
  return (
    <label htmlFor={name} className={cx("field__label")}>
      <span>{label}</span>
      {required && <span className={cx("field__label--required")}> *</span>}
      {Array.isArray(subLabel)
        ? subLabel.map((lb, index) => (
            <p className={cx("field__label__sub-label")} key={index}>
              - {lb}
            </p>
          ))
        : subLabel && <span className={cx("field__label__sub-label")}> ({subLabel})</span>}
    </label>
  );
}

FormLabel.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  subLabel: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  ]),
  required: PropTypes.bool,
};

FormLabel.defaultProps = {
  subLabel: "",
  required: false,
};

export default FormLabel;
