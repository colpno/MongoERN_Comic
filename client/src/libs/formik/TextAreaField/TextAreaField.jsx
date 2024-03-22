import { TextArea } from "components";
import PropTypes from "prop-types";
import { FormGroup } from "react-bootstrap";

function TextAreaField({
  field,
  form,
  textAreaStyles,

  placeholder,
  maxLength,
  readOnly,
  rows,
}) {
  const { name } = field;
  const { touched, errors } = form;

  return (
    <FormGroup className="field">
      <TextArea
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        maxLength={maxLength}
        touched={touched[name]}
        error={errors[name]}
        {...field}
        {...textAreaStyles}
      />
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
  maxLength: PropTypes.number,
  readOnly: PropTypes.bool,
  textAreaStyles: PropTypes.shape({}),
  rows: PropTypes.number,
};

TextAreaField.defaultProps = {
  form: {},
  placeholder: "",
  maxLength: 1000,
  readOnly: false,
  textAreaStyles: {},
  rows: 5,
};

export default TextAreaField;
