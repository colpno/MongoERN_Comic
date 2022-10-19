import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import classNames from "classnames/bind";

import styles from "./TextArea.module.scss";

const cx = classNames.bind(styles);

function TextArea({
  onKeyDown,
  isInvalid,
  field,
  placeholder,
  //   disabled,
  maxLength,
  readOnly,
  passRef,
}) {
  return (
    <ReactQuill
      ref={passRef}
      modules={TextArea.modules}
      formats={TextArea.formats}
      onKeyDown={onKeyDown}
      {...field}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`${isInvalid ? "is-invalid" : ""} ${cx("textarea")}`}
    >
      <span
        className={cx("text-length")}
      >{`${field.value.length}/${maxLength}`}</span>
    </ReactQuill>
  );
}

TextArea.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill TextArea formats
 * See https://quilljs.com/docs/formats/
 */
TextArea.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

TextArea.propTypes = {
  passRef: PropTypes.shape({}),
  onKeyDown: PropTypes.func,
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
  isInvalid: PropTypes.bool,
};

TextArea.defaultProps = {
  isInvalid: false,
  passRef: {},
  onKeyDown: () => {},
  form: {},
  placeholder: "",
  rows: 10,
  disabled: false,
  autoFocus: false,
  maxLength: 1000,
  readOnly: false,
};

export default TextArea;
