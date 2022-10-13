import { Radio } from "components";
import PropTypes from "prop-types";
import { Alert, Col, Row } from "react-bootstrap";

function RadioGroup(props) {
  const { field, form, options, disabled, col } = props;
  const { name } = field;
  const { touched, errors } = form;
  const { sm, md, lg, xl, xxl } = col;
  const showError = touched[name] && !!errors[name];

  return (
    <Row className="field">
      {showError && <Alert variant="danger">{errors[name]}</Alert>}
      {options.map((option) => {
        return (
          <Col
            key={option.value}
            className="field__group"
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            xxl={xxl}
          >
            <Radio field={field} disabled={disabled} value={option.value}>
              {option.label}
            </Radio>
          </Col>
        );
      })}
    </Row>
  );
}

RadioGroup.propTypes = {
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

RadioGroup.defaultProps = {
  form: {},
  disabled: false,
  col: {},
};

export default RadioGroup;
