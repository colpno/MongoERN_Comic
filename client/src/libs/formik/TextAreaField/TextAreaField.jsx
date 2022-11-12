import TextArea from "components/TextArea/TextArea";
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
  // const reactQuillRef = useRef();

  // const checkCharacterCount = (event) => {
  //   const { unprivilegedEditor } = reactQuillRef.current;
  //   if (
  //     unprivilegedEditor.getLength() > maxLength &&
  //     event.key !== "Backspace"
  //   ) {
  //     event.preventDefault();
  //   }
  // };

  // useEffect(() => {
  //   reactQuillRef.current?.editor.root.setAttribute("spellcheck", "false");
  // }, []);

  return (
    <FormGroup className="field">
      <TextArea
        // passRef={reactQuillRef}
        placeholder={placeholder}
        readOnly={readOnly}
        // onKeyDown={checkCharacterCount}
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
