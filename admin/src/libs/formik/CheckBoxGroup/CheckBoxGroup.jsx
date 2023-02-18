import { CheckBox } from "components";
import PropTypes from "prop-types";
import { Alert, Col, Row } from "react-bootstrap";

function CheckBoxGroup(props) {
  const { field, form, options, disabled, col } = props;
  const { name } = field;
  const { touched, errors } = form;
  const showError = touched[name] && !!errors[name];

  return (
    <Row className="field">
      {showError && <Alert variant="danger">{errors[name]}</Alert>}
      {options.map((option, index) => {
        return (
          <Col key={index} className="field__group" {...col}>
            <CheckBox
              field={field}
              isChecked={field.value.some((val) => val === option.value)}
              disabled={disabled}
              value={option.value}
            >
              {option.label}
            </CheckBox>
          </Col>
        );
      })}
    </Row>
  );
}

CheckBoxGroup.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  disabled: PropTypes.bool,
  col: PropTypes.shape({
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    xxl: PropTypes.number,
  }),
};

CheckBoxGroup.defaultProps = {
  form: {},
  disabled: false,
  col: {},
};

export default CheckBoxGroup;
