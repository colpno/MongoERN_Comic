import classNames from "classnames/bind";
import Button from "components/Button";
import { useClickOutSide } from "hooks";
import PropTypes from "prop-types";
import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

import styles from "./Select.module.scss";

const cx = classNames.bind(styles);

// eslint-disable-next-line no-unused-vars
function Select({ field, options, cn, onChange }) {
  const [selectedOption, setSelectedOption] = useState({
    value: options[0].value,
    label: options[0].label,
  });
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useClickOutSide(showOptions, () => setShowOptions(false));

  const handleSelect = (option) => {
    setSelectedOption({ value: option.value, label: option.label });

    const fakeEvent = {
      target: {
        value: option.value,
      },
    };

    onChange(fakeEvent);
    setShowOptions(false);
  };

  return (
    <div className={cx("wrapper")} ref={selectRef}>
      <Button
        wrapper
        className={`${cx("select")} ${cn}`}
        onClick={() => setShowOptions(!showOptions)}
      >
        {selectedOption.label}
        <BiChevronDown
          className={cx("chevron-down", showOptions ? "active" : "")}
        />
      </Button>
      {showOptions && (
        <div className={cx("options")}>
          {options.map((option) => (
            <Button
              wrapper
              key={option.value}
              className={cx("option")}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

Select.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  cn: PropTypes.string,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  field: {},
  cn: "",
  onChange: () => {},
};

export default Select;
