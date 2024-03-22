import classNames from "classnames/bind";
import { Radio } from "components/index.jsx";
import PropTypes from "prop-types";
import { memo } from "react";
import styles from "../PaymentOptions.module.scss";

const cx = classNames.bind(styles);

function PaymentOptionItem({ option, onChange, selectedOption }) {
  return (
    <div className={cx("method")} key={option.value}>
      <Radio
        field={{
          name: "payMethod",
          onChange,
          value: selectedOption.value,
        }}
        value={option.value}
      >
        <span>{option.label}</span>
        {!!option.subLabel && <span className={cx("sub-label")}>{option.subLabel}</span>}
      </Radio>
    </div>
  );
}

PaymentOptionItem.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subLabel: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedOption: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(PaymentOptionItem);
