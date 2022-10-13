import PropTypes from "prop-types";
import { FormControl, FormGroup } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";

function TextAreaField(props) {
  const { field, form, placeholder, rows, disabled, maxLength, readOnly } =
    props;
  const { name, value } = field;
  const { touched, errors } = form;

  return (
    <FormGroup className="field">
      <FormControl
        {...field}
        as="textarea"
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        readOnly={readOnly}
        rows={rows}
        isInvalid={touched[name] && !!errors[name]}
        className="field__textarea"
      />
      <span className="field__textarea__length">{`${value.length}/${maxLength}`}</span>
      <Feedback type="invalid">{errors[name]}</Feedback>
    </FormGroup>
  );
}

TextAreaField.propTypes = {
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
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
};

TextAreaField.defaultProps = {
  form: {},
  placeholder: "",
  rows: 10,
  disabled: false,
  autoFocus: false,
  maxLength: 1000,
  readOnly: false,
};

export default TextAreaField;
