import PropTypes from "prop-types";
import { FormControl, FormGroup } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";

function InputField({
  field,
  form,
  type,
  placeholder,
  maxLength,
  disabled,
  readOnly,
  letterCount,
}) {
  const { name, value } = field;
  const { touched, errors } = form;

  return (
    <FormGroup className="field">
      <FormControl
        {...field}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        isInvalid={touched[name] && !!errors[name]}
        className="field__input"
        style={letterCount ? { paddingRight: "100px" } : {}}
      />
      {letterCount && maxLength !== 0 && (
        <span className="field__input__length">{`${value.length}/${maxLength}`}</span>
      )}
      <Feedback type="invalid">{errors[name]}</Feedback>
    </FormGroup>
  );
}

InputField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  letterCount: PropTypes.bool,
};

InputField.defaultProps = {
  form: {},
  type: "text",
  placeholder: "",
  maxLength: 255,
  disabled: false,
  readOnly: false,
  letterCount: false,
};

export default InputField;
