import PropTypes from "prop-types";
import ReactSelect from "react-select";

function Select({
  className,
  field,
  options,
  defaultValue,
  multi,
  disabled,
  searchable,
  autoFocus,
  height,
}) {
  const styles = {
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

  return (
    <ReactSelect
      className={className}
      styles={styles}
      {...field}
      defaultValue={defaultValue.label ? defaultValue : options[0]}
      options={options}
      isMulti={multi}
      isDisabled={disabled}
      isSearchable={searchable}
      autoFocus={autoFocus}
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
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  defaultValue: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  multi: PropTypes.bool,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

Select.defaultProps = {
  height: 45,
  field: {},
  defaultValue: {},
  multi: false,
  disabled: false,
  searchable: false,
  autoFocus: false,
  className: "",
  cn: () => {},
};

export default Select;

/* Custom select */

// function Select({ field, options, className, onChange }) {
// const [selectedOption, setSelectedOption] = useState({
//   value: options[0].value,
//   label: options[0].label,
// });
// const [showOptions, setShowOptions] = useState(false);
// const selectRef = useClickOutSide(showOptions, () => setShowOptions(false));

// const handleSelect = (option) => {
//   setSelectedOption({ value: option.value, label: option.label });

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
//     {selectedOption.label}
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
