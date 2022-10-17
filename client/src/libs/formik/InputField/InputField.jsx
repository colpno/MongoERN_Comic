import Input from "components/Input/Input";
import PropTypes from "prop-types";
import { FormGroup } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";

function InputField(props) {
  const { field, form } = props;
  const { name } = field;
  const { errors, touched } = form;

  return (
    <FormGroup className="field">
      <Input
        {...props}
        isInvalid={form ? touched[name] && !!errors[name] : "false"}
      />
      <Feedback type="invalid">{errors[name]}</Feedback>
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
