import { Input } from "components";
import PropTypes from "prop-types";
import { FormGroup } from "react-bootstrap";

function InputField(props) {
  const { field, form, ...others } = props;
  const { name } = field;
  const { errors, touched } = form;

  return (
    <FormGroup className="field">
      <Input
        {...field}
        {...others}
        error={errors[name]}
        touched={touched[name]}
      />
    </FormGroup>
  );
}

InputField.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    errors: PropTypes.shape({}),
    touched: PropTypes.shape({}),
  }),
};

InputField.defaultProps = {
  form: {},
};

export default InputField;
