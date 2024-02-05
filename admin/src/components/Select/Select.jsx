/* eslint-disable no-unused-vars */
import { useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import ReactSelect from "react-select";

const customStyles = (theme, height) => {
  return {
    control: (base) => ({
      ...base,
      minHeight: `${height}px`,
      height: `${height}px`,
    }),
    singleValue: (base) => ({
      ...base,
      color: theme.palette.text.primary,
    }),
    multiValue: (base) => ({
      ...base,
      color: theme.palette.text.primary,
    }),
    valueContainer: (base) => ({
      ...base,
      height: `${height - 2}px`,
      padding: "0 6px",
      backgroundColor: theme.palette.background.default,
      border: "none",
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
      backgroundColor: theme.palette.background.default,
    }),
    menu: (base) => ({
      ...base,
      width: "max-content",
      minWidth: "100%",
      zIndex: "5",
      backgroundColor: theme.palette.background.default,
    }),
    option: (base, { data, isDisabled, isFocused, isSelected }) => {
      let backgroundColor = isFocused
        ? theme.palette.grey["800"]
        : theme.palette.background.default;
      if (isSelected) backgroundColor = theme.palette.primary.main;

      return {
        ...base,
        backgroundColor,
      };
    },
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
  const theme = useTheme();
  const styles = customStyles(theme, height);

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
      styles={{
        ...styles,
      }}
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
