import TextArea from "components/TextArea/TextArea";
import PropTypes from "prop-types";
import { useRef } from "react";
import { FormGroup } from "react-bootstrap";
import Feedback from "react-bootstrap/esm/Feedback";

function TextAreaField(props) {
  const { field, form, placeholder, maxLength, readOnly } = props;
  const { name } = field;
  const { touched, errors } = form;
  const reactQuillRef = useRef();

  const checkCharacterCount = (event) => {
    const { unprivilegedEditor } = reactQuillRef.current;
    if (
      unprivilegedEditor.getLength() > maxLength &&
      event.key !== "Backspace"
    ) {
      event.preventDefault();
    }
  };

  return (
    <FormGroup className="field">
      <TextArea
        passRef={reactQuillRef}
        field={field}
        placeholder={placeholder}
        readOnly={readOnly}
        onKeyDown={checkCharacterCount}
        isInvalid={touched[name] && !!errors[name]}
        maxLength={maxLength}
      />
      <Feedback type="invalid">{errors[name]}</Feedback>
    </FormGroup>
  );
}

// function TextAreaField(props) {
//   const { field, form, placeholder, rows, disabled, maxLength, readOnly } =
//     props;
//   const { name, value } = field;
//   const { touched, errors } = form;

//   return (
//     <FormGroup className="field">
//       <FormControl
//         {...field}
//         as="textarea"
//         placeholder={placeholder}
//         readOnly={readOnly}
//         disabled={disabled}
//         maxLength={maxLength}
//         rows={rows}
//         isInvalid={touched[name] && !!errors[name]}
//         className="field__textarea"
//       />
//       <span className="field__textarea__length">{`${value.length}/${maxLength}`}</span>
//       <Feedback type="invalid">{errors[name]}</Feedback>
//     </FormGroup>
//   );
// }

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
};

TextAreaField.defaultProps = {
  form: {},
  placeholder: "",
  maxLength: 1000,
  readOnly: false,
};

export default TextAreaField;
