import PropTypes from "prop-types";
import Select from "components/Select";

function SelectField(props) {
  const { field, options, label } = props;
  const { text, subText, isRequired } = label;

  return (
    <div className="field">
      {text && (
        <label name={field.name} className="field__label">
          {text}
          {isRequired && <span className="field__label--required"> *</span>}
          {subText && (
            <span className="field__label__sub-label"> ({subText})</span>
          )}
        </label>
      )}
      <Select field={field} options={options} />
    </div>
  );
}

SelectField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
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
