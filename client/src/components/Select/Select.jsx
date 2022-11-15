import PropTypes from "prop-types";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactSelect from "react-select";

import { setSelectedOption } from "libs/redux/slices/selectFieldSlice";

const customStyles = (height) => {
  return {
    control: (base) => ({
      ...base,
      minHeight: `${height}px`,
      height: `${height}px`,
    }),

    valueContainer: (base) => ({
      ...base,
      height: `${height - 2}px`,
      padding: "0 6px",
    }),

    input: (base) => ({
      ...base,
      margin: "0px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: `${height - 2}px`,
    }),
    menu: (base) => ({
      ...base,
      width: "max-content",
      minWidth: "100%",
    }),
  };
};

function Select({
  className,
  field,
  options,
  defaultValue,
  onChange,
  multi,
  disabled,
  searchable,
  autoFocus,
  clearable,
  height,
  limitSelected,
}) {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    value: options[0].value,
    label: options[0].label,
  });
  const styles = customStyles(height);

  const handleChange = (selected) => {
    if (multi && selected.length <= limitSelected) {
      setValue(selected);
      onChange(selected);
      return;
    }
    if (!multi) {
      setValue(selected);
      onChange(selected);
    }
  };

  useEffect(() => {
    dispatch(setSelectedOption(value));
  }, [value.value]);

  return (
    <ReactSelect
      className={className}
      styles={styles}
      {...field}
      value={value}
      onChange={handleChange}
      defaultValue={defaultValue.label ? defaultValue : "Select"}
      options={options}
      isMulti={multi}
      isDisabled={disabled}
      isSearchable={searchable}
      autoFocus={autoFocus}
      isClearable={clearable}
    />
  );
}

Select.propTypes = {
  className: PropTypes.string,
  cn: PropTypes.func,
  height: PropTypes.number,
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
  }),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }).isRequired
  ).isRequired,
  defaultValue: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  multi: PropTypes.bool,
  disabled: PropTypes.bool,
  limitSelected: PropTypes.number,
  searchable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  clearable: PropTypes.bool,
};

Select.defaultProps = {
  height: 45,
  field: {},
  onChange: () => {},
  defaultValue: {},
  multi: false,
  disabled: false,
  searchable: false,
  autoFocus: false,
  clearable: false,
  limitSelected: Number.MAX_SAFE_INTEGER,
  className: "",
  cn: () => {},
};

export default memo(Select);

/* Custom select */

// function Select({ field, options, className, onChange }) {
// const [value, setValue] = useState({
//   value: options[0].value,
//   label: options[0].label,
// });
// const [showOptions, setShowOptions] = useState(false);
// const selectRef = useClickOutSide(showOptions, () => setShowOptions(false));

// const handleSelect = (option) => {
//   setValue({ value: option.value, label: option.label });

//   const fakeEvent = {
//     target: {
//       value: option.value,
//     },
//   };

//   onChange(fakeEvent);
//   setShowOptions(false);
// };

// return (
// <div className={cx("wrapper")} ref={selectRef}>
//   <Button
//     wrapper
//     className={`${cx("select")} ${className}`}
//     onClick={() => setShowOptions(!showOptions)}
//   >
//     {value.label}
//     <BiChevronDown
//       className={cx("chevron-down", showOptions ? "active" : "")}
//     />
//   </Button>
//   {showOptions && (
//     <div className={cx("options")}>
//       {options.map((option) => (
//         <Button
//           wrapper
//           key={option.value}
//           className={cx("option")}
//           onClick={() => handleSelect(option)}
//         >
//           {option.label}
//         </Button>
//       ))}
//     </div>
//   )}
// </div>
// );
// }
