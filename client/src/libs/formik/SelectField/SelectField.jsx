import PropTypes from "prop-types";
import { Select } from "components";

function SelectField({ field, form, options, label }) {
  const { text, subText, isRequired } = label;
  const { name, value, onBlur } = field;
  const { setFieldValue } = form;

  return (
    <div className="field">
      {text && (
        <label name={name} className="field__label">
          {text}
          {isRequired && <span className="field__label--required"> *</span>}
          {subText && <span className="field__label__sub-label"> ({subText})</span>}
        </label>
      )}
      <Select
        name={name}
        value={value}
        onBlur={onBlur}
        setValue={setFieldValue}
        options={options}
        isFormik
      />
    </div>
  );
}

SelectField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }).isRequired
      ),
    ]).isRequired,
    onBlur: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,

  label: PropTypes.shape({
    text: PropTypes.string,
    subText: PropTypes.string,
    isRequired: PropTypes.bool,
  }),
};

SelectField.defaultProps = {
  label: { text: "", subText: "", isRequired: false },
};

export default SelectField;
