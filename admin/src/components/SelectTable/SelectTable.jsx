import classNames from "classnames/bind";
import PropTypes from "prop-types";

import { Radio } from "components";
import styles from "./SelectTable.module.scss";

const cx = classNames.bind(styles);

function SelectTable({ title, options, chosen, setChosen }) {
  const handleMethodChange = (e) => {
    const { value } = e.target;
    const option = options.find((method) => {
      return method.value === value;
    });
    setChosen({
      ...option,
      value,
    });
  };

  return (
    <>
      <p className={cx("title")}>{title}</p>
      <div className={cx("options")}>
        {options.map((option) => {
          return (
            <div className={cx("option")} key={option.value}>
              <Radio
                field={{
                  name: "payMethod",
                  onChange: handleMethodChange,
                  value: chosen.value,
                }}
                value={option.value}
              >
                <span>{option.label}</span>
              </Radio>
            </div>
          );
        })}
      </div>
    </>
  );
}

SelectTable.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  setChosen: PropTypes.func.isRequired,
  chosen: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

SelectTable.defaultProps = {
  title: "",
};

export default SelectTable;
