import PropTypes from "prop-types";
import { memo } from "react";
import ReactSelect from "react-select";

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
      zIndex: "5",
    }),
  };
};

function Select({
  name,
  onBlur,
  onChange,
  value,
  setValue,
  options,

  isFormik,
  multiple,
  disabled,
  searchable,
  autoFocus,
  clearable,
  maxSelectedOptions,

  height,
  className,
}) {
  const styles = customStyles(height);

  const handleChange = (option) => {
    // name prop only for formik
    isFormik ? setValue(name, option) : setValue(option);
    onChange(option);
  };

  const limitSelectedValues = () => {
    if (multiple && maxSelectedOptions > 0) return value.length >= maxSelectedOptions;
    return false;
  };

  return (
    <ReactSelect
      value={value}
      onChange={handleChange}
      options={options}
      styles={styles}
      onBlur={onBlur}
      className={className}
      isMulti={multiple}
      isDisabled={disabled}
      isSearchable={searchable}
      autoFocus={autoFocus}
      isClearable={clearable}
      isOptionDisabled={limitSelectedValues}
    />
  );
}

Select.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  ]).isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,

  isFormik: PropTypes.bool,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  searchable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  clearable: PropTypes.bool,
  maxSelectedOptions: PropTypes.number,

  height: PropTypes.number,
  className: PropTypes.string,
};

Select.defaultProps = {
  name: "",
  onBlur: () => {},
  onChange: () => {},

  isFormik: false,
  multiple: false,
  disabled: false,
  searchable: false,
  autoFocus: false,
  clearable: false,
  maxSelectedOptions: 0,

  height: 45,
  className: "",
};

export default memo(Select);

/* REMOVE: Custom select

 function Select({ field, options, className, onChange }) {
 const [value, setValue] = useState({
   value: options[0].value,
   label: options[0].label,
 });
 const [showOptions, setShowOptions] = useState(false);
 const selectRef = useClickOutSide(showOptions, () => setShowOptions(false));

 const handleSelect = (option) => {
   setValue({ value: option.value, label: option.label });

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
     className={`${cx("select")} ${className}`}
     onClick={() => setShowOptions(!showOptions)}
   >
     {value.label}
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
 } */
